import express from "express";
export const router = express.Router();
import {
  findAllFriends,
  findNewFriend,
  sendFriendRequest,
  acceptFriendRequest,
} from "../controllers/friendController";
import { protect } from "../middleware/authMiddleware";

router.get("/findAllFriends", protect, findAllFriends);
router.get("/findNewFriend/:friendName", protect, findNewFriend);
router.post("/sendFriendRequest", protect, sendFriendRequest);
router.post("/acceptFriendRequest", protect, acceptFriendRequest);
