import express from "express";
export const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import {
  deletePost,
  findAllPosts,
  likeComment,
  likePost,
  makeComment,
  makePost,
  deleteComment,
} from "../controllers/postController";

router.get("/findAllPosts/:offset", protect, findAllPosts);
router.post("/makePost", protect, makePost);
router.post("/likePost", protect, likePost);
router.delete("/deletePost", protect, deletePost);
router.post("/makeComment", protect, makeComment);
router.post("/likeComment", protect, likeComment);
router.delete("/deleteComment", protect, deleteComment);
