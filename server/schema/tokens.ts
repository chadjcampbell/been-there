import { pgTable, timestamp, varchar, integer } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const tokens = pgTable("tokens", {
  userId: integer("user_id").notNull().primaryKey(),
  token: varchar("token").notNull(),
  createdAt: timestamp("created_at").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export type Token = InferModel<typeof tokens>; // return type when queried
