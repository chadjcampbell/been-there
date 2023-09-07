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
    user?: UserType;
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
    console.log(verified);
    next();
  }
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
