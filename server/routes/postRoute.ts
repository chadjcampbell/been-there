import express from "express";
export const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import {
  findAllPosts,
  likePost,
  makePost,
} from "../controllers/postController";

router.get("/findAllPosts", protect, findAllPosts);
router.post("/makePost", protect, makePost);
router.post("/likePost", protect, likePost);