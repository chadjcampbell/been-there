import express from "express";
import { Server } from "socket.io";
require("dotenv").config();
import helmet from "helmet";
import cors from "cors";
import { router as userRoute } from "./routes/userRoute";
import { router as friendRoute } from "./routes/friendRoute";
import { router as postRoute } from "./routes/postRoute";
import { router as chatRoute } from "./routes/chatRoute";
import { router as notificationRoute } from "./routes/notificationRoute";
const app = express();
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorMiddleware";
import {
  authorizeUser,
  sendOnlineUsers,
  setOnlineStatus,
} from "./controllers/socketController";
import { redisClient } from "./redis";
require("./passport/googlePassport");
require("./passport/facebookPassport");

const port = process.env.PORT || 3000;
const server = require("http").createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// middlewares
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/auth", userRoute);
app.use("/friends", friendRoute);
app.use("/posts", postRoute);
app.use("/chats", chatRoute);
app.use("/notification", notificationRoute);

// socket.io connection
io.use(authorizeUser);
io.use(setOnlineStatus);
io.on("connection", (socket) => {
  console.log(socket.id + " connected");
  socket.on("disconnect", () => {
    const userId = socket.userId;
    // Remove the user from the online status in Redis
    redisClient.del(`online:${userId}`);
    console.log(userId + " disconnected");
    sendOnlineUsers();
  });
  socket.on("message", (data) => {
    io.emit("newMessage", data.newMessage);
  });
});

// error middleware
app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
