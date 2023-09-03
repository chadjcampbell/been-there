import { Socket } from "socket.io";
import { redisClient } from "../redis";
import { NextFunction } from "express";
import { Session } from "express-session";

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
    user?: UserType;
  }
}

const authorizeUser = (socket: Socket, next: NextFunction) => {
  if (!socket.request.session || !socket.request.session.user) {
    next(new Error("Not authorized"));
  }
  socket.user = { ...socket.request.session.user };
  redisClient.hset(`userid:${socket.user.name}`, "userid", socket.user.userid);
  next();
};

const addFriend = async (
  friendName: string,
  cb: (arg0: { done: boolean; errorMsg: string }) => void
) => {
  const friendUserID = await redisClient.hget(`userid:${friendName}`, "userid");
  cb({ done: false, errorMsg: "No users found" });
  console.log(friendUserID);
};

export { authorizeUser, addFriend };
