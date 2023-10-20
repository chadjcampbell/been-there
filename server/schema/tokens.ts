import { pgTable, varchar, integer, bigint } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const tokens = pgTable("tokens", {
  user_id: integer("user_id").notNull().primaryKey(),
  token: varchar("token").notNull(),
  created_at: bigint("created_at", { mode: "number" }).notNull(),
  expires_at: bigint("expires_at", { mode: "number" }).notNull(),
});

export type Token = InferModel<typeof tokens>; // return type when queried
