import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Application,
} from "express";
import db from "../db";
import { eq } from "drizzle-orm";
import { users } from "../schema";

const generateToken = (id: string) => {
  return jwt.sign({ id }, String(process.env.JWT_SECRET), { expiresIn: "1d" });
};

export const registerUser = [
  // validate and sanitize fields
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Name must be specified."),
  body("password")
    .trim()
    .isLength({ min: 6, max: 24 })
    .withMessage("Password must be between 6 and 24 characters."),
  body("email").trim().isEmail().withMessage("Email must be valid."),
  asyncHandler(async (req, res) => {
    // extract the validation errors from a request
    const errors = validationResult(req);
    // there are errors
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    } else {
      // data from form is valid
      // check if user already exists
      const { name, email, password } = req.body;
      const userExists = await db.query.users.findFirst({
        where: eq(email, users.email),
      });
      if (userExists) {
        res.status(400);
        throw new Error("User already exists with that email");
      } else {
        const user = await db.insert(users).values({ name: name });
        // generate token
        const token = generateToken(user.id);
        // send http cookie
        res.cookie("token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: "none",
          secure: true,
        });

        if (user) {
          const { _id, name, email, photo, phone, bio } = user;
          res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token,
          });
        } else {
          res.status(400);
          throw new Error("Invalid user data");
        }
      }
    }
  }),
];

export const loginUser = [
  // validate and sanitize fields
  body("email").trim().isEmail().withMessage("Email must be valid."),
  body("password")
    .trim()
    .isLength({ min: 6, max: 24 })
    .withMessage("Password must be between 6 and 24 characters."),

  asyncHandler(async (req, res) => {
    // extract the validation errors from a request
    const errors = validationResult(req);
    // there are errors
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error("Invalid email or password");
    } else {
      // check if user exists
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400);
        throw new Error("User not found, please sign up");
      } else {
        // user exists, compare passwords
        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (passwordIsCorrect) {
          // generate token
          const token = generateToken(user._id);
          // send http cookie
          res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
          });
          const { _id, name, email, photo, phone, bio } = user;
          res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token,
          });
        } else {
          res.status(400);
          throw new Error("Invalid email or password");
        }
      }
    }
  }),
];

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // expire now
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logged out" });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

export const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { name, email, photo, phone, bio } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.photo = req.body.photo || photo;
    user.bio = req.body.bio || bio;
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const changePassword = [
  body("password")
    .trim()
    .isLength({ min: 6, max: 24 })
    .withMessage("Password must be between 6 and 24 characters."),
  asyncHandler(async (req, res) => {
    // extract the validation errors from a request
    const errors = validationResult(req);
    // there are errors
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    const { oldPassword, password } = req.body;
    // check old password
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
    if (user && passwordIsCorrect) {
      user.password = password;
      await user.save();
      res.status(200).send("Password changed successfuly");
    } else {
      res.status(400);
      throw new Error("Old password is incorrect");
    }
  }),
];

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }
  // delete old token if exists
  let oldToken = await Token.findOne({ userId: user._id });
  if (oldToken) {
    await oldToken.deleteOne();
  }

  // create reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  // hash token
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // save token to db
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // 30 minutes
  }).save();

  // construct reset url
  const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  // reset email
  const message = `
  <h2>Hello ${user.name}</h2>
  <p>Please use the url below to reset your password</p>
  <p>This reset link is valid for only 30 minutes</p>
  <a href=${resetURL} clicktracking=off>${resetURL}</a>
  <p>Regards,</p>
  <p>inStock Team</p>
  `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset email sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;
  // hash token to compare to db
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // find token in db
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });
  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or expired token");
  }
  // find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({ message: "Password successfully reset" });
});
