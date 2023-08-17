import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 60 }).notNull(),
  email: varchar("email", { length: 40 }).notNull().unique(),
  passhash: varchar("passhash").notNull(),
  photo: varchar("photo")
    .notNull()
    .default(
      "https://img.freepik.com/free-icon/user_318-159711.jpg?t=st=0~exp=0~hmac=7ec3ecd49f9d99da3d2907db79b3d1abfcae7d393cdd51ab28bbab45dcc51596"
    ),
  bio: varchar("bio")
    .notNull()
    .default(
      "Add your bio here to tell people who you are and where you've been..."
    ),
});

export type User = InferModel<typeof users>; // return type when queried
