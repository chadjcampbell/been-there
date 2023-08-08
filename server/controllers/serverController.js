require("dotenv").config();
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redisClient = require("../redis");

const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  credentials: true,
  name: "sid",
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
    httpOnly: true,
    expires: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
  },
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

module.exports = { sessionMiddleware, wrap };
