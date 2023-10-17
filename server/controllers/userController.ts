import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";
import db from "../db";
import { and, eq, gt } from "drizzle-orm";
import {
  chat_messages,
  friend_requests,
  friends,
  notifications,
  tokens,
  users,
} from "../schema";
import { RequestUserAttached } from "../middleware/authMiddleware";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, String(process.env.JWT_SECRET), { expiresIn: "1d" });
};

export const registerUser = [
  // validate and sanitize fields
  body("name")
    .trim()
    .isLength({ min: 3, max: 40 })
    .escape()
    .withMessage("Name must be specified."),
  body("password")
    .trim()
    .isLength({ min: 6, max: 24 })
    .withMessage("Password must be between 6 and 24 characters."),
  body("email")
    .trim()
    .isEmail()
    .isLength({ min: 3, max: 40 })
    .withMessage("Email must be valid."),
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
        where: eq(users.email, email),
      });
      if (userExists) {
        res.status(400);
        throw new Error("User already exists with that email");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userArray = await db
          .insert(users)
          .values({ name: name, passhash: hashedPassword, email: email })
          .returning();
        // generate token
        const user = userArray[0];
        const token = generateToken(String(user.user_id));
        // send http cookie
        res.cookie("token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: "none",
          secure: true,
        });

        if (user) {
          const { user_id, name, email, photo_url, bio, registration_date } =
            user;
          res.status(201).json({
            userId: user_id,
            name,
            email,
            photoUrl: photo_url,
            bio,
            registrationDate: registration_date,
          });
          await db.insert(friends).values({
            user_id_1: user.user_id,
            user_id_2: 1,
          });
          await db.insert(friend_requests).values({
            sender_id: user.user_id,
            receiver_id: 1,
            status: "accepted",
          });
          await db.insert(friend_requests).values({
            sender_id: 2,
            receiver_id: user.user_id,
            status: "pending",
          });
          await db.insert(notifications).values({
            user_id: user.user_id,
            type: "chat_message",
            content: `New message from Chad Campbell`,
            is_read: false,
          });
          await db.insert(notifications).values({
            user_id: user.user_id,
            type: "friend_request",
            content: `Friend request from Demo User`,
            is_read: false,
          });
          await db.insert(chat_messages).values({
            sender_id: 1,
            receiver_id: user.user_id,
            message_text:
              "Hello! Thanks for checking out my app. If you have any questions, you can find me on GitHub, LinkedIn, or reach me directly at chadjcampbell@gmail.com 😀",
            message_photo_url: "",
          });
          res.end();
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
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (!user) {
        res.status(400);
        throw new Error("User not found, please sign up");
      } else {
        // user exists, compare passwords
        if (!user.passhash) {
          throw new Error("Password required");
        }
        const passwordIsCorrect = await bcrypt.compare(password, user.passhash);
        if (passwordIsCorrect) {
          // generate token
          const token = generateToken(String(user.user_id));
          // send http cookie
          res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
          });
          const { user_id, name, email, photo_url, bio, registration_date } =
            user;
          res.status(200).json({
            userId: user_id,
            name,
            email,
            photoUrl: photo_url,
            bio,
            registrationDate: registration_date,
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
  req.user = {};
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // expire now
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Logged out" });
  return;
});

export const getUser = asyncHandler(async (req: RequestUserAttached, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }
  const user = await db.query.users.findFirst({
    where: eq(users.user_id, Number(req.user.user_id)),
  });
  if (user) {
    const { user_id, name, email, photo_url, bio, registration_date } = user;
    res.status(200).json({
      userId: user_id,
      name,
      email,
      photoUrl: photo_url,
      bio,
      registrationDate: registration_date,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

export const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.json(false);
    return;
  }
  // verify token
  const verified = jwt.verify(token, String(process.env.JWT_SECRET));
  if (verified) {
    res.json(true);
    return;
  } else {
    res.json(false);
    return;
  }
});

export const updateUser = asyncHandler(
  async (req: RequestUserAttached, res) => {
    if (!req.user) {
      res.status(404);
      throw new Error("User not found");
    } else {
      const user = await db.query.users.findFirst({
        where: eq(users.user_id, Number(req.user.user_id)),
      });
      if (user) {
        const { name, email, photo_url, bio } = user;
        user.email = email;
        user.name = req.body.name || name;
        user.photo_url = req.body.photo || photo_url;
        user.bio = req.body.bio || bio;
        const updatedUserArray = await db
          .update(users)
          .set(user)
          .where(eq(users.user_id, Number(req.user.user_id)))
          .returning();
        const updatedUser = updatedUserArray[0];
        res.status(200).json({
          userId: updatedUser.user_id,
          name: updatedUser.name,
          email: updatedUser.email,
          photoUrl: updatedUser.photo_url,
          bio: updatedUser.bio,
          registrationDate: updatedUser.registration_date,
        });
      }
    }
  }
);

// functions below here aren't hooked up yet
export const changePassword = [
  body("password")
    .trim()
    .isLength({ min: 6, max: 24 })
    .withMessage("Password must be between 6 and 24 characters."),
  asyncHandler(async (req: RequestUserAttached, res) => {
    // extract the validation errors from a request
    const errors = validationResult(req);
    // there are errors
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }
    if (!req.user) {
      res.status(400);
      throw new Error("User not found");
    }
    const user = await db.query.users.findFirst({
      where: eq(users.user_id, Number(req.user.user_id)),
    });
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    const { oldPassword, password } = req.body;
    // check old password
    if (!user.passhash) {
      throw new Error("Password required");
    }
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.passhash);
    if (user && passwordIsCorrect) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db
        .update(users)
        .set({ passhash: hashedPassword })
        .where(eq(users.user_id, Number(req.user.user_id)));
      res.status(200).send("Password changed successfuly");
    } else {
      res.status(400);
      throw new Error("Old password is incorrect");
    }
  }),
];

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }
  // delete old token if exists
  await db.delete(tokens).where(eq(users.user_id, user.user_id));

  // create reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user.user_id;
  // hash token
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // save token to db
  await db.insert(tokens).values({
    user_id: user.user_id,
    token: hashedToken,
    created_at: Date.now(),
    expires_at: Date.now() + 30 * (60 * 1000), // 30 minute expiration
  });

  // construct reset url
  const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  // reset email
  const message = `
  <h2>Hello ${user.name}</h2>
  <p>Please use the url below to reset your password</p>
  <p>This reset link is valid for only 30 minutes</p>
  <a href=${resetURL} clicktracking=off>${resetURL}</a>
  <p>Regards,</p>
  <p>Been There Team</p>
  `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = String(process.env.EMAIL_USER);

  try {
    await sendEmail(subject, message, send_to, sent_from, "");
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
  const userTokenArray = await db
    .select()
    .from(tokens)
    .where(
      and(gt(tokens.expires_at, Date.now()), eq(tokens.token, hashedToken))
    );
  const userToken = userTokenArray[0];
  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or expired token");
  }
  // find user
  const user = await db.query.users.findFirst({
    where: eq(users.user_id, userToken.user_id),
  });
  if (user && userToken) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .update(users)
      .set({ passhash: hashedPassword })
      .where(eq(users.user_id, user.user_id));
    res.status(200).json({ message: "Password successfully reset" });
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});
