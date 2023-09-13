import {
  pgTable,
  serial,
  integer,
  text,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";
import { users } from "./users";

export const notifications = pgTable("notifications", {
  notification_id: serial("notification_id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  type: varchar("type", { length: 25 }).notNull(), // 'chat_message', 'friend_request', 'friend_request_accepted'
  content: text("content").notNull(),
  is_read: boolean("is_read").default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.user_id],
    references: [users.user_id],
  }),
}));

export type Notifications = InferModel<typeof notifications>; // return type when queried
