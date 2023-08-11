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

router.post("/register", registerUser);
router.post("/login", rateLimiter, loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.get("/loggedIn", loginStatus);
router.patch("/updateUser", protect, updateUser);
router.patch("/changePassword", protect, changePassword);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);
