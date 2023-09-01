import express from "express";
export const router = express.Router();
import {
  findAllFriends,
  findNewFriend,
  sendFriendRequest,
  acceptFriendRequest,
  pendingFriends,
  rejectFriendRequest,
  deleteFriend,
} from "../controllers/friendController";
import { protect } from "../middleware/authMiddleware";

router.get("/findAllFriends", protect, findAllFriends);
router.get("/findNewFriend/:friendName", protect, findNewFriend);
router.post("/sendFriendRequest", protect, sendFriendRequest);
router.post("/acceptFriendRequest", protect, acceptFriendRequest);
router.post("/rejectFriendRequest", protect, rejectFriendRequest);
router.get("/pendingFriends", protect, pendingFriends);
router.delete("/deleteFriend/:id", protect, deleteFriend);
