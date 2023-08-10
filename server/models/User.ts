import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 30 }).notNull().unique(),
  passhash: varchar("passhash").notNull(),
  photo: varchar("photo")
    .notNull()
    .default(
      "https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1686866825~exp=1686867425~hmac=249cf4990844c725b121c896f61d1efd0efe31fc8af6dc522628c05fd6afe430"
    ),
  bio: varchar("bio").notNull().default("Your bio here..."),
});

export type User = InferModel<typeof users>; // return type when queried
