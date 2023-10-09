import asyncHandler from "express-async-handler";
import db from "../db";
import { RequestUserAttached } from "../middleware/authMiddleware";
import { chat_messages } from "../schema";
import { body, validationResult } from "express-validator";
import { and, eq } from "drizzle-orm";
import { notifications } from "../schema/notifications";
import { io } from "..";
import { sendPushNotification } from "../utils/sendPushNotification";

export const findChat = asyncHandler(async (req: RequestUserAttached, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("Not authorized, please log in");
  }
  const { id: friendId } = req.params;
  const result = await db.query.chat_messages.findMany({
    where: (chat_messages, { eq, and, or }) =>
      or(
        and(
          eq(chat_messages.sender_id, Number(req.user?.user_id)),
          eq(chat_messages.receiver_id, Number(friendId))
        ),
        and(
          eq(chat_messages.receiver_id, Number(req.user?.user_id)),
          eq(chat_messages.sender_id, Number(friendId))
        )
      ),
    with: {
      user1: {
        columns: {
          user_id: false,
          passhash: false,
        },
      },
      user2: {
        columns: {
          user_id: false,
          passhash: false,
        },
      },
    },
    orderBy: (chat_messages, { asc }) => [asc(chat_messages.timestamp)],
  });

  if (!result) {
    res.status(400);
    throw new Error("No chat found");
  }
  res.status(200).json(result);
  return;
});

export const sendMessage = [
  // validate and sanitize fields
  body("message")
    .trim()
    .isLength({ max: 280 })
    .withMessage("Message text must be at most 280 characters long."),
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
      const { message, messagePhotoUrl, friendId } = req.body;

      const result = await db
        .insert(chat_messages)
        .values({
          sender_id: req.user.user_id,
          receiver_id: friendId,
          message_text: message,
          message_photo_url: messagePhotoUrl ? messagePhotoUrl : "",
        })
        .returning();

      const insertedMsgId = result[0].message_id;

      const newMessage = await db.query.chat_messages.findFirst({
        where: eq(chat_messages.message_id, insertedMsgId),
        with: {
          user1: {
            columns: {
              user_id: false,
              passhash: false,
            },
          },
          user2: {
            columns: {
              user_id: false,
              passhash: false,
            },
          },
        },
      });

      res.status(201).json(newMessage);
      const notificationExists = await db.query.notifications.findFirst({
        where: and(
          eq(notifications.user_id, friendId),
          eq(notifications.content, `New message from ${req.user.name}`),
          eq(notifications.is_read, false)
        ),
      });
      if (notificationExists) {
        await db
          .delete(notifications)
          .where(
            eq(
              notifications.notification_id,
              notificationExists.notification_id
            )
          );
      }
      const notificationArr = await db
        .insert(notifications)
        .values({
          user_id: friendId,
          type: "chat_message",
          content: `New message from ${req.user.name}`,
          is_read: false,
        })
        .returning();
      io.emit("notification", notificationArr[0]);
      await sendPushNotification(notificationArr[0]);
      return;
    } catch (error: any) {
      console.error("Error sending message:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while sending the message" });
    }
  }),
];
