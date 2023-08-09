import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Application,
} from "express";
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, please login");
      }
      // verify token
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      // get userID from token
      const user = await User.findById(verified.id).select("-password");
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }
  }
);
