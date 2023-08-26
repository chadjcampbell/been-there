import {
  pgTable,
  serial,
  integer,
  text,
  varchar,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";
import { users } from "./users";
import { comments } from "./comments";

export const posts = pgTable("posts", {
  post_id: serial("post_id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  post_photo_url: varchar("post_photo_url", { length: 255 }),
  post_date: timestamp("post_date").notNull().defaultNow(),
  user_location: jsonb("user_location"),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  user_id: one(users, {
    fields: [posts.user_id],
    references: [users.user_id],
  }),
  comments: many(comments),
}));

export type Posts = InferModel<typeof posts>; // return type when queried
