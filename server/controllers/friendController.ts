import { and, eq, ilike, ne, or } from "drizzle-orm";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import db from "../db";
import { friend_requests, friends, users } from "../schema";
import { RequestUserAttached } from "../middleware/authMiddleware";

export const findAllFriends = asyncHandler(
  async (req: RequestUserAttached, res) => {
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    const data = await db
      .select({ users })
      .from(users)
      .innerJoin(
        friends,
        or(
          eq(friends.user_id_1, users.user_id),
          eq(friends.user_id_2, users.user_id)
        )
      )
      .where(
        and(
          ne(users.user_id, req.user.user_id),
          or(
            eq(friends.user_id_1, req.user.user_id),
            eq(friends.user_id_2, req.user.user_id)
          )
        )
      );
    if (!data) {
      res.status(400);
      throw new Error("No friends found");
    }
    const friendsList = data.map((item) => item.users);
    res.status(200).json(friendsList);
    return;
  }
);

export const findNewFriend = asyncHandler(async (req, res) => {
  // check if user exists
  const potentialFriends = await db.query.users.findMany({
    where: ilike(users.name, `%${req.params.friendName}%`),
  });
  if (!potentialFriends) {
    res.status(400);
    throw new Error("No users found with that name");
  }
  res.status(200).json(potentialFriends);
  return;
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
    const friendRequestStatus = await db
      .select()
      .from(friend_requests)
      .where(
        or(
          and(
            eq(friend_requests.sender_id, req.user.user_id),
            eq(friend_requests.receiver_id, friendId)
          ),
          and(
            eq(friend_requests.receiver_id, req.user.user_id),
            eq(friend_requests.sender_id, friendId)
          )
        )
      );
    if (friendRequestStatus.length > 0) {
      res.status(400);
      throw new Error("Friend request already sent");
    }
    await db.insert(friend_requests).values({
      sender_id: req.user.user_id,
      receiver_id: friend.user_id,
      status: "pending",
    });
    res.status(200).end();
  }),
];

export const pendingFriends = asyncHandler(
  async (req: RequestUserAttached, res) => {
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    const data = await db
      .select({ users })
      .from(users)
      .innerJoin(friend_requests, eq(users.user_id, friend_requests.sender_id))
      .where(
        and(
          eq(friend_requests.receiver_id, req.user.user_id),
          eq(friend_requests.status, "pending")
        )
      );

    const pendingFriends = data.map((item) => item.users);
    res.status(200).json(pendingFriends);
    return;
  }
);

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
    try {
      await db
        .update(friend_requests)
        .set({ status: "accepted" })
        .where(
          and(
            eq(friend_requests.sender_id, friendId),
            eq(friend_requests.receiver_id, req.user.user_id)
          )
        );
      await db.insert(friends).values({
        user_id_1: req.user.user_id,
        user_id_2: friendId,
      });
    } catch {
      res.status(400);
      throw new Error("Error accepting friend request");
    }
    res.status(200).end();
  }),
];

export const rejectFriendRequest = [
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
    try {
      await db
        .update(friend_requests)
        .set({ status: "rejected" })
        .where(
          and(
            eq(friend_requests.sender_id, friendId),
            eq(friend_requests.receiver_id, req.user.user_id)
          )
        );
    } catch {
      res.status(400);
      throw new Error("Error accepting friend request");
    }
    res.status(200).end();
  }),
];

export const deleteFriend = asyncHandler(
  async (req: RequestUserAttached, res) => {
    // where: ilike(users.name, `%${req.params.id}%`),
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    const { id } = req.params;
    try {
      await db
        .delete(friends)
        .where(
          or(
            and(
              eq(friends.user_id_1, req.user.user_id),
              eq(friends.user_id_2, id)
            ),
            and(eq(), eq())
          )
        );
    } catch {
      res.status(400);
      throw new Error("Something went wrong");
    }
    res.status(200).send();
    return;
  }
);
