import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import db from "../db";
import { comments, friends, likes, posts } from "../schema";
import { RequestUserAttached } from "../middleware/authMiddleware";
import axios from "axios";
import { eq, and, or, inArray } from "drizzle-orm";

export const findAllPosts = asyncHandler(
  async (req: RequestUserAttached, res) => {
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }

    const friendArray = await db.query.friends.findMany({
      where: or(
        eq(friends.user_id_1, req.user.user_id),
        eq(friends.user_id_2, req.user.user_id)
      ),
    });

    const friendIdSet = new Set<number>();
    for (const friendship of friendArray) {
      friendIdSet.add(friendship.user_id_1);
      friendIdSet.add(friendship.user_id_2);
    }
    const filteredFriendIds: number[] = Array.from(friendIdSet);

    const result = await db.query.posts.findMany({
      where: inArray(posts.user_id, filteredFriendIds),
      with: {
        user: {
          columns: {
            user_id: false,
            passhash: false,
          },
        },
        comments: {
          where: (comments, { eq }) => eq(comments.post_id, posts.post_id),
          with: {
            user: true,
            likes: {
              where: (likes, { eq }) => eq(likes.target_type, "comment"),
            },
          },
        },
        likes: {
          where: (likes, { eq }) => eq(likes.target_type, "post"),
        },
      },
      orderBy: (posts, { desc }) => [desc(posts.post_date)],
    });

    if (!result) {
      res.status(400);
      throw new Error("No posts found");
    }
    res.status(200).json(result);
    return;
  }
);

interface GeocodingComponent {
  types: string[];
  long_name: string;
}

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
      const { content, postPhotoUrl, latitude, longitude } = req.body;

      // get location info from google location services
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            latlng: `${latitude},${longitude}`,
            key: process.env.GOOGLE_API,
          },
        }
      );
      const data = response.data;
      // Extract relevant location information
      const locationInfo = data.results[0].address_components;
      const city = locationInfo.find((component: GeocodingComponent) =>
        component.types.includes("locality")
      ).long_name;
      const state = locationInfo.find((component: GeocodingComponent) =>
        component.types.includes("administrative_area_level_1")
      ).long_name;
      const country = locationInfo.find((component: GeocodingComponent) =>
        component.types.includes("country")
      ).short_name;

      const result = await db
        .insert(posts)
        .values({
          user_id: req.user.user_id,
          content: content,
          post_photo_url: postPhotoUrl ? postPhotoUrl : "",
          user_location: { city, state, country, latitude, longitude },
        })
        .returning({ postId: posts.post_id });

      const newPost = await db.query.posts.findFirst({
        where: eq(posts.post_id, result[0].postId),
        with: {
          user: {
            columns: {
              user_id: false,
              passhash: false,
            },
          },
          comments: true,
          likes: true,
        },
      });

      res.status(201).json({
        message: "Post created successfully",
        post: newPost,
      });
    } catch (error: any) {
      console.error("Error creating post:", error.message);
      res.status(500);
      throw new Error("An error occurred while creating the post");
    }
  }),
];

export const likePost = asyncHandler(async (req: RequestUserAttached, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("Not authorized, please log in");
  }
  const { postId } = req.body;
  const userLikeExists = await db.query.likes.findFirst({
    where: and(
      eq(likes.user_id, req.user.user_id),
      eq(likes.target_id, postId),
      eq(likes.target_type, "post")
    ),
  });
  if (userLikeExists) {
    res.status(400);
    return;
  }
  try {
    await db.insert(likes).values({
      user_id: req.user.user_id,
      target_id: postId,
      target_type: "post",
    });
    res.status(201).send();
  } catch (error: any) {
    console.error("Error liking post:", error.message);
    res.status(500).json({ error: "An error occurred while liking the post" });
  }
});

export const deletePost = asyncHandler(
  async (req: RequestUserAttached, res) => {
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    const { postId } = req.body;
    try {
      await db.delete(comments).where(eq(comments.post_id, postId));
      await db.delete(posts).where(eq(posts.post_id, postId));
      res.status(201).send();
    } catch (error: any) {
      console.error("Error deleting post:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the post" });
    }
  }
);

export const makeComment = [
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
      const { postId, content, commentPhotoUrl } = req.body;

      const result = await db
        .insert(comments)
        .values({
          post_id: postId,
          user_id: req.user.user_id,
          content: content,
          comment_photo_url: commentPhotoUrl ? commentPhotoUrl : "",
        })
        .returning({ commentId: comments.comment_id });

      const newComment = await db.query.comments.findFirst({
        where: eq(comments.comment_id, result[0].commentId),
        with: {
          user: {
            columns: {
              user_id: false,
              passhash: false,
            },
          },
          likes: {
            where: (likes, { eq }) => eq(likes.target_type, "comment"),
          },
        },
      });

      res.status(201).json({
        message: "Comment created successfully",
        comment: newComment,
      });
    } catch (error: any) {
      console.error("Error creating comment:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while creating the comment" });
    }
  }),
];

export const likeComment = asyncHandler(
  async (req: RequestUserAttached, res) => {
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    const { commentId } = req.body;
    const userLikeExists = await db.query.likes.findFirst({
      where: and(
        eq(likes.user_id, req.user.user_id),
        eq(likes.target_id, commentId),
        eq(likes.target_type, "comment")
      ),
    });
    if (userLikeExists) {
      res.status(400);
      return;
    }
    try {
      await db.insert(likes).values({
        user_id: req.user.user_id,
        target_id: commentId,
        target_type: "comment",
      });
      res.status(201).send();
    } catch (error: any) {
      console.error("Error liking comment:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while liking the comment" });
    }
  }
);

export const deleteComment = asyncHandler(
  async (req: RequestUserAttached, res) => {
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    const { commentId } = req.body;
    try {
      await db.delete(comments).where(eq(comments.comment_id, commentId));
      res.status(201).send();
    } catch (error: any) {
      console.error("Error deleting comment:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the comment" });
    }
  }
);
