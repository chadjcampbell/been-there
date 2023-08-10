import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { users } from "./users";

export const tokens = pgTable("tokens", {
  userId: integer("user_id").references(() => users.id),
  token: varchar("token").notNull(),
  createdAt: timestamp("created_at").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export type Token = InferModel<typeof tokens>; // return type when queried
