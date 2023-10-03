import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const subscriptions = pgTable("subscriptions", {
  subscription_id: serial("subscription_id").primaryKey(),
  endpoint: text("endpoint").notNull(),
  expiration_time: integer("expiration_time").notNull(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
});

export type Subscriptions = InferModel<typeof subscriptions>; // return type when queried
