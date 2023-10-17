import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import db from "../db";
import { eq } from "drizzle-orm";
import {
  chat_messages,
  friend_requests,
  friends,
  notifications,
  users,
} from "../schema";
require("dotenv").config();

const options = {
  clientID: process.env.FACEBOOK_CLIENT_ID || "",
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
  callbackURL: `${String(process.env.BACKEND_URL)}/auth/facebook/callback`,
};

passport.use(
  new FacebookStrategy(
    options,
    async (_accessToken, _refreshToken, profile, done) => {
      const account = profile._json;
      console.log(account);
      return;
      try {
        const existingFacebook = await db.query.users.findFirst({
          where: eq(users.email, String(account.email)),
        });
        if (existingFacebook) {
          done(null, existingFacebook);
          return;
        }

        // no user found, make a new one
        if (!account.name || !account.email) {
          throw new Error("Google account info missing");
        }
        const userArray = await db
          .insert(users)
          .values({
            name: account.name,
            email: account.email,
            photo_url: account.picture,
          })
          .returning();
        const user = userArray[0];
        done(null, user);
        await db.insert(friends).values({
          user_id_1: user.user_id,
          user_id_2: 1,
        });
        await db.insert(friend_requests).values({
          sender_id: user.user_id,
          receiver_id: 1,
          status: "accepted",
        });
        await db.insert(friend_requests).values({
          sender_id: 2,
          receiver_id: user.user_id,
          status: "pending",
        });
        await db.insert(notifications).values({
          user_id: user.user_id,
          type: "chat_message",
          content: `New message from Chad Campbell`,
          is_read: false,
        });
        await db.insert(notifications).values({
          user_id: user.user_id,
          type: "friend_request",
          content: `Friend request from Demo User`,
          is_read: false,
        });

        await db.insert(chat_messages).values({
          sender_id: 1,
          receiver_id: user.user_id,
          message_text:
            "Hello! Thanks for checking out my app. If you have any questions, you can find me on GitHub, LinkedIn, or reach me directly at chadjcampbell@gmail.com 😀",
          message_photo_url: "",
        });
      } catch (err: any) {
        done(err);
      }
    }
  )
);
