const express = require("express");
const { Server } = require("socket.io");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const app = express();
const session = require("express-session");
const Redis = require("ioredis");
const RedisStore = require("connect-redis").default;

const port = process.env.PORT || 3000;
const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const redisClient = new Redis();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);

// routes
app.use("/auth", authRouter);

io.on("connect", (socket) => {});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
