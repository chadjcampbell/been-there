import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
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
      console.log(account);
      try {
        //TODO login/register Google user
        done(null, profile._json);
      } catch (err: any) {
        done(err);
      }
    }
  )
);
