import { pgTable, serial, integer, pgEnum } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const request_status = pgEnum("request_status", [
  "pending",
  "accepted",
  "rejected",
]);

export const friend_requests = pgTable("friend_requests", {
  request_id: serial("request_id").primaryKey(),
  sender_id: integer("sender_id").notNull(),
  receiver_id: integer("receiver_id").notNull(),
  status: request_status("status").notNull(),
});

export type FriendRequest = InferModel<typeof friend_requests>; // return type when queried
