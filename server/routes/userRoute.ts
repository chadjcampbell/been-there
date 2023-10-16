import express from "express";
export const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import rateLimiter from "../middleware/rateLimiter";
import passport from "passport";
require("dotenv").config();

router.post("/register", registerUser);
router.post("/login", rateLimiter, loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.get("/loggedIn", loginStatus);
router.patch("/updateUser", protect, updateUser);
router.patch("/changePassword", protect, changePassword);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);

// routes below for Google auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${String(process.env.FRONTEND_URL)}/login`,
    session: false,
  }),
  function (_req, res) {
    // Successful authentication, redirect home.
    return res.redirect(String(process.env.FRONTEND_URL));
  }
);
