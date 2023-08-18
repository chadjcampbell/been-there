import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
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

export type Friends = InferModel<typeof friends>; // return type when queried
