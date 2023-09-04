import {
  pgTable,
  serial,
  integer,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";
import { users } from "./users";
export const chat_messages = pgTable("chat_messages", {
  message_id: serial("message_id").primaryKey(),
  sender_id: integer("sender_id")
    .notNull()
    .references(() => users.user_id),
  receiver_id: integer("receiver_id")
    .notNull()
    .references(() => users.user_id),
  message_text: text("message_text").notNull(),
  message_photo_url: varchar("message_photo_url", { length: 255 }),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const chat_messagesRelations = relations(chat_messages, ({ one }) => ({
  user1: one(users, {
    fields: [chat_messages.sender_id],
    references: [users.user_id],
  }),
  user2: one(users, {
    fields: [chat_messages.receiver_id],
    references: [users.user_id],
  }),
}));

export type ChatMessages = InferModel<typeof chat_messages>; // return type when queried
