import { pgTable, serial, integer, pgEnum } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { users } from "./users";

export const request_status = pgEnum("request_status", [
  "pending",
  "accepted",
  "rejected",
]);

export const friendRequests = pgTable("friendRequests", {
  request_id: serial("request_id").primaryKey(),
  sender_id: integer("sender_id")
    .notNull()
    .references(() => users.user_id),
  receiver_id: integer("receiver_id")
    .notNull()
    .references(() => users.user_id),
  status: request_status("status").notNull(),
});

export type FriendRequests = InferModel<typeof friendRequests>; // return type when queried
