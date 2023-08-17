import { pgTable, varchar, integer } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const tokens = pgTable("tokens", {
  user_id: integer("user_id").notNull().primaryKey(),
  token: varchar("token").notNull(),
  created_at: integer("created_at").notNull(),
  expires_at: integer("expires_at").notNull(),
});

export type Token = InferModel<typeof tokens>; // return type when queried
