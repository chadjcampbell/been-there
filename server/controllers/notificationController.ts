import { and, eq } from "drizzle-orm";
import asyncHandler from "express-async-handler";
import db from "../db";
import { notifications } from "../schema";
import { RequestUserAttached } from "../middleware/authMiddleware";

export const getAllNotifications = asyncHandler(
  async (req: RequestUserAttached, res) => {
    if (!req.user) {
      res.status(400);
      throw new Error("Not authorized, please log in");
    }
    const data = await db.query.notifications.findMany({
      where: and(
        eq(notifications.user_id, req.user.user_id),
        eq(notifications.is_read, false)
      ),
      orderBy: (notifications, { desc }) => [desc(notifications.created_at)],
    });
    console.log(data);
    res.status(200).json(data);
    return;
  }
);
