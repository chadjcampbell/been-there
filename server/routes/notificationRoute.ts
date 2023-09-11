import express from "express";
export const router = express.Router();
import { getAllNotifications } from "../controllers/notificationController";
import { protect } from "../middleware/authMiddleware";

router.get("/", protect, getAllNotifications);
