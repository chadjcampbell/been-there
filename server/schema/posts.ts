import {
  pgTable,
  serial,
  integer,
  text,
  varchar,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { users } from "./users";

export const posts = pgTable("posts", {
  post_id: serial("friendship_id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  content: text("content").notNull(),
  post_photo_url: varchar("post_photo_url", { length: 255 }),
  post_date: timestamp("post_date").notNull().defaultNow(),
  user_location: jsonb("user_location"),
});

export type Posts = InferModel<typeof posts>; // return type when queried
