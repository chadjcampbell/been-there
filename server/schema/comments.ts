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
import { posts } from "./posts";

export const comments = pgTable("comments", {
  comment_id: serial("post_id").primaryKey(),
  post_id: integer("post_id")
    .notNull()
    .references(() => posts.post_id),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  comment_photo_url: varchar("comment_photo_url", { length: 255 }),
  comment_date: timestamp("comment_date").notNull().defaultNow(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  post_id: one(posts, {
    fields: [comments.user_id],
    references: [posts.user_id],
  }),
  user_id: one(users, {
    fields: [comments.user_id],
    references: [users.user_id],
  }),
}));

export type Comments = InferModel<typeof comments>; // return type when queried