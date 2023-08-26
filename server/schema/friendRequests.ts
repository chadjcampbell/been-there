import { pgTable, serial, integer, pgEnum } from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";
import { users } from "./users";

export const request_status = pgEnum("request_status", [
  "pending",
  "accepted",
  "rejected",
]);

export const friend_requests = pgTable("friend_requests", {
  request_id: serial("request_id").primaryKey(),
  sender_id: integer("sender_id")
    .notNull()
    .references(() => users.user_id),
  receiver_id: integer("receiver_id")
    .notNull()
    .references(() => users.user_id),
  status: request_status("status").notNull(),
});

export const friend_requestsRelations = relations(
  friend_requests,
  ({ one }) => ({
    sender_id: one(users, {
      fields: [friend_requests.sender_id],
      references: [users.user_id],
    }),
    receiver_id: one(users, {
      fields: [friend_requests.receiver_id],
      references: [users.user_id],
    }),
  })
);

export type FriendRequest = InferModel<typeof friend_requests>; // return type when queried
