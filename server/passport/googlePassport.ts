import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "../db";
import { eq } from "drizzle-orm";
import { users } from "../schema";
require("dotenv").config();

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  callbackURL: `${String(process.env.BACKEND_URL)}/auth/google/callback`,
};

passport.use(
  new GoogleStrategy(
    options,
    async (_accessToken, _refreshToken, profile, done) => {
      const account = profile._json;
      try {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, String(account.email)),
        });
        // if user exists, send user
        if (existingUser) {
          done(null, existingUser);
          // if user doesn't exist, register user and send
        } else {
          done(null, account);
        }
      } catch (err: any) {
        done(err);
      }
    }
  )
);

// "account" variable
/* {
  sub: '1234567890',
  name: 'Chad Campbell',
  given_name: 'Chad',
  family_name: 'Campbell',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocLRYbPhXsQbhI-8pBM-Q8GWud141yEK5UHncwVH-PElPw=s96-c',
  email: 'chadjcampbell@gmail.com',
  email_verified: true,
  locale: 'en'
}
 */
