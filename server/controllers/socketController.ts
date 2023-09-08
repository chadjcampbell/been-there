import { Socket } from "socket.io";
import { redisClient } from "../redis";
import { Session } from "express-session";
import jwt, { JwtPayload } from "jsonwebtoken";
import { io } from "..";

type UserType = {
  userid: number;
  name: string;
};

declare module "http" {
  interface IncomingMessage {
    session: Session & {
      user: UserType;
    };
  }
}

declare module "socket.io" {
  interface Socket {
    userId?: number;
  }
}

const authorizeUser = (socket: Socket, next: any) => {
  const token = socket.handshake.headers.cookie?.substring(6);
  // verify token
  if (!token) {
    const err = new Error("Not authorized");
    next(err);
  } else {
    const verified = jwt.verify(
      token,
      String(process.env.JWT_SECRET)
    ) as JwtPayload;
    socket.userId = verified.id;
    console.log(socket.userId);
    next();
  }
};

const setOnlineStatus = async (socket: Socket, next: any) => {
  const userId = socket.userId;

  // Set the user as online in Redis with a timeout of 5 minutes
  redisClient.set(`online:${userId}`, "true", (err) => {
    if (err) {
      return next(new Error("Failed to set user as online in Redis"));
    }
    next();
  });
};

const sendOnlineUsers = () => {
  // Use the keys Redis command to fetch all keys matching the pattern 'online:*'
  redisClient.keys("online:*", (err, onlineUserKeys) => {
    if (err) {
      console.error("Error fetching online users from Redis:", err);
      return;
    }
    // Extract the user IDs from the keys
    const onlineUserIds = onlineUserKeys?.map((key) => key.split(":")[1]);
    // Emit the online user list to all connected clients
    console.log(onlineUserIds);
    io.emit("onlineUsers", onlineUserIds);
  });
};

export { authorizeUser, setOnlineStatus, sendOnlineUsers };
