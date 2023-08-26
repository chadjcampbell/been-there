import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import db from "../db";
import { posts, users, comments } from "../schema";
import { RequestUserAttached } from "../middleware/authMiddleware";
import axios from "axios";
import { sql } from "drizzle-orm";

export const findAllPosts = asyncHandler(
  async (req: RequestUserAttached, res) => {
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    const data = await db
      .select({
        posts,
        user_name: users.name,
        user_photo_url: users.photo_url,
        count: sql<number>`coalesce(comments.comment_id, 0)`.mapWith(Number),
      })
      .from(posts)
      .innerJoin();

    if (!data) {
      res.status(400);
      throw new Error("No posts found");
    }
    res.status(200).json(data);
    return;
  }
);

export const makePost = [
  // validate and sanitize fields
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Post text is required.")
    .isLength({ max: 280 })
    .withMessage("Post text must be at most 280 characters long."),
  asyncHandler(async (req: RequestUserAttached, res) => {
    // check for erros in validation
    const errors = validationResult(req);
    // there are errors
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }
    // check if user exists
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    try {
      const { content, postPhotoUrl } = req.body;
      const ipAddress = req.ip;

      const response = await axios.get(`http://ipinfo.io/${ipAddress}/json`);
      const userLocation = response.data;

      const result = await db
        .insert(posts)
        .values({
          user_id: req.user.user_id,
          content: content,
          post_photo_url: postPhotoUrl ? postPhotoUrl : "",
          user_location: userLocation,
        })
        .returning();

      res.status(201).json({
        message: "Post created successfully",
        post: result,
      });
    } catch (error: any) {
      console.error("Error creating post:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while creating the post" });
    }
  }),
];
