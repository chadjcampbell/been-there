import express from "express";
export const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import { findChat, sendMessage } from "../controllers/chatController";

router.get("/:id", protect, findChat);
router.post("/", protect, sendMessage);
