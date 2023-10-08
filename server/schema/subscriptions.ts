import { pgTable, integer, text, jsonb, serial } from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";
import { users } from "./users";

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  endpoint: text("endpoint").notNull(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
});

export type Subscriptions = InferModel<typeof subscriptions>; // return type when queried

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.user_id],
    references: [users.user_id],
  }),
}));
