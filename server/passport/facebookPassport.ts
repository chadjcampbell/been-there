import { eq } from "drizzle-orm";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import db from "../db";
import {
  users,
  friends,
  friend_requests,
  notifications,
  chat_messages,
} from "../schema";
require("dotenv").config();

const options = {
  clientID: process.env.FACEBOOK_CLIENT_ID || "",
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
  callbackURL: `${String(process.env.BACKEND_URL)}/auth/facebook/callback`,
  profileFields: ["id", "name", "email", "picture"],
};

passport.use(
  new FacebookStrategy(
    options,
    async (_accessToken, _refreshToken, profile, done) => {
      const account = profile._json;
      const profileUrl = account.picture.data.url;

      try {
        const existingFacebook = await db.query.users.findFirst({
          where: eq(users.email, String(account.email)),
        });
        if (existingFacebook) {
          done(null, existingFacebook);
          return;
        }

        // no user found, make a new one
        if (!account.first_name || !account.last_name || !account.email) {
          throw new Error("Facebook account info missing");
        }
        const userArray = await db
          .insert(users)
          .values({
            name: account.first_name + " " + account.last_name,
            email: account.email,
            photo_url: profileUrl,
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

// facebook "account" variable
/* {
  id: '0123456789',
  last_name: 'Campbell',
  first_name: 'Chad',
  email: 'chadjcampbell@gmail.com',
  picture: {
    data: {
      height: 51,
      is_silhouette: false,
      url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10112562912888919&height=50&width=50&ext=1700166528&hash=AeSBfaMJT3CYfK4ol6Y',
      width: 50
    }
  }
}

   */
