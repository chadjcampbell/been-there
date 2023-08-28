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
import { likes } from "./likes";

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
  user: one(users, {
    fields: [posts.user_id],
    references: [users.user_id],
  }),
  comments: many(comments),
  likes: many(likes),
}));

export type Posts = InferModel<typeof posts>; // return type when queried
