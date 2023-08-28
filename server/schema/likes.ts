import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";
import { users } from "./users";

export const likes = pgTable("likes", {
  like_id: serial("like_id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  target_id: integer("target_id").notNull(),
  target_type: varchar("target_type", { length: 255 }).notNull(),
});

export const likesRelations = relations(likes, ({ one }) => ({
  user_id: one(users, {
    fields: [likes.user_id],
    references: [users.user_id],
  }),
}));

export type Likes = InferModel<typeof likes>; // return type when queried
