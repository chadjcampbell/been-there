import { and, eq, or } from "drizzle-orm";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import db from "../db";
import { friendRequests, friends, users } from "../schema";
import { RequestUserAttached } from "../middleware/authMiddleware";

export const findAllFriends = asyncHandler(async (req, res) => {
  const friendsList = await db
    .select()
    .from(friends)
    .where(
      or(
        eq(friends.user_id_1, req.body.user.userId),
        eq(friends.user_id_2, req.body.user.userId)
      )
    );
  if (!friendsList) {
    res.status(400);
    throw new Error("No friends found");
  }
  res.status(200).json(friendsList);
});

export const findNewFriend = asyncHandler(async (req, res) => {
  // check if user exists
  const potentialFriends = await db.query.users.findMany({
    where: eq(users.name, req.params.friendName),
  });
  if (!potentialFriends) {
    res.status(400);
    throw new Error("No users found with that name");
  }
  res.status(200).json(potentialFriends);
});

export const sendFriendRequest = [
  // validate and sanitize fields
  body("friendId").trim(),
  asyncHandler(async (req: RequestUserAttached, res) => {
    // extract the validation errors from a request
    const errors = validationResult(req);
    // there are errors
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error("Error sending friend request");
    }
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    // check if user exists
    const { friendId } = req.body;
    const friend = await db.query.users.findFirst({
      where: eq(users.user_id, friendId),
    });
    if (!friend) {
      res.status(400);
      throw new Error("Error sending friend request");
    }
    const friendRequestStatus = await db.query.friendRequests.findFirst({
      where: and(
        eq(friendRequests.sender_id, req.user.user_id),
        eq(friendRequests.receiver_id, friendId)
      ),
    });
    if (friendRequestStatus) {
      res.status(400);
      throw new Error("Friend request already sent");
    }
    const SQLArray = await db.insert(friendRequests).values({
      sender_id: req.user.user_id,
      receiver_id: friend.user_id,
      status: "pending",
    });
    res.status(200).end();
  }),
];

export const acceptFriendRequest = [
  // validate and sanitize fields
  body("friendId").trim(),
  asyncHandler(async (req: RequestUserAttached, res) => {
    // extract the validation errors from a request
    const errors = validationResult(req);
    // there are errors
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error("Error accepting friend request");
    }
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    // check if friendRequest exists
    const { friendId } = req.body;
    const friendRequestPending = await db.query.friendRequests.findFirst({
      where: and(
        eq(friendRequests.sender_id, friendId),
        eq(friendRequests.receiver_id, req.user.user_id),
        eq(friendRequests.status, "pending")
      ),
    });
    if (!friendRequestPending) {
      res.status(400);
      throw new Error("Error accepting friend request");
    }
    const SQLArray = await db.insert(friends).values({
      user_id_1: req.user.user_id,
      user_id_2: friendId,
    });
    res.status(200).end();
  }),
];
