import express from "express";
import { Server } from "socket.io";
require("dotenv").config();
import helmet from "helmet";
import cors from "cors";
import { router as userRoute } from "./routes/userRoute";
import { router as friendRoute } from "./routes/friendRoute";
import { router as postRoute } from "./routes/postRoute";
import { router as chatRoute } from "./routes/chatRoute";
const app = express();
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorMiddleware";
import { sessionMiddleware, wrap } from "./controllers/serverController";
import { authorizeUser } from "./controllers/socketController";

const port = process.env.PORT || 3000;
const server = require("http").createServer(app);

const io = new Server(server, {
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

// socket.io connection
io.use(authorizeUser);
io.on("connection", (socket) => {
  console.log(socket.id + "connected");
});

// error middleware
app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
