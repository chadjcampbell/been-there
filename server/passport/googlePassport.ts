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

// profile._json response
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
