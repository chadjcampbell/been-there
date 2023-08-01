const express = require("express");
const { Server } = require("socket.io");
require("dotenv").config();
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;
const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    // TODO - add front end origin after deployment
    origin: "http://localhost:5173",
    credentials: "true",
  },
});

// middlewares
app.use(helmet());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.json("Hello  world");
});

io.on("connect", (socket) => {});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
