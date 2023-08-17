import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const users = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  name: varchar("name", { length: 60 }).notNull(),
  email: varchar("email", { length: 40 }).notNull().unique(),
  passhash: varchar("passhash").notNull(),
  photo_url: varchar("photo_url")
    .notNull()
    .default(
      "https://img.freepik.com/free-icon/user_318-159711.jpg?t=st=0~exp=0~hmac=7ec3ecd49f9d99da3d2907db79b3d1abfcae7d393cdd51ab28bbab45dcc51596"
    ),
  bio: varchar("bio")
    .notNull()
    .default(
      "Add your bio here to tell people who you are and where you've been..."
    ),
  registration_date: timestamp("registration_date").notNull().defaultNow(),
});

export type User = InferModel<typeof users>; // return type when queried
