const express = require("express");
const { Server } = require("socket.io");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const app = express();
const { sessionMiddleware, wrap } = require("./controllers/serverController");

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
app.use(sessionMiddleware);

// routes
app.use("/auth", authRouter);

// socket.io middleware
io.use(wrap(sessionMiddleware));
io.on("connect", (socket) => {
  console.log(socket.request.session.user.email);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
