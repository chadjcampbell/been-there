import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";
import { users } from "./users";

export const friends = pgTable("friends", {
  friendship_id: serial("friendship_id").primaryKey(),
  user_id_1: integer("user_id_1")
    .notNull()
    .references(() => users.user_id),
  user_id_2: integer("user_id_2")
    .notNull()
    .references(() => users.user_id),
});

export const friendsRelations = relations(friends, ({ one }) => ({
  user_id_1: one(users, {
    fields: [friends.user_id_1],
    references: [users.user_id],
    relationName: "user1",
  }),
  user_id_2: one(users, {
    fields: [friends.user_id_2],
    references: [users.user_id],
    relationName: "user2",
  }),
}));

export type Friend = InferModel<typeof friends>; // return type when queried
