import { Socket } from "socket.io";
import { redisClient } from "../redis";
import { Session } from "express-session";
import jwt, { JwtPayload } from "jsonwebtoken";

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
  redisClient.setex(`online:${userId}`, 300, "true", (err) => {
    if (err) {
      return next(new Error("Failed to set user as online in Redis"));
    }
    next();
  });
};

export { authorizeUser, setOnlineStatus };
