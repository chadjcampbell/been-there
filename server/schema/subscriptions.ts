import { pgTable, integer, text, jsonb } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const subscriptions = pgTable("subscriptions", {
  endpoint: text("endpoint").notNull(),
  expiration_time: integer("expiration_time"),
  keys: jsonb("keys"),
});

export type Subscriptions = InferModel<typeof subscriptions>; // return type when queried
