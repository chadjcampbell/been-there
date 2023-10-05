import express from "express";
export const router = express.Router();
import {
  getAllNotifications,
  removeNotification,
  subscribe,
} from "../controllers/notificationController";
import { protect } from "../middleware/authMiddleware";

router.get("/", protect, getAllNotifications);
router.delete("/:id", protect, removeNotification);
router.post("/subscribe", protect, subscribe);
