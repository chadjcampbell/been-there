require("dotenv").config();
import session, { Session } from "express-session";
const RedisStore = require("connect-redis").default;
import { redisClient } from "../redis";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { Socket } from "socket.io";

declare module "http" {
  interface IncomingMessage {
    session: Session & {
      authenticated: boolean;
    };
  }
}

const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET || "",
  name: "sid",
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVIRONMENT === "production" ? true : "auto",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
  },
});

const wrap =
  (middleware: RequestHandler) => (socket: Socket, next: NextFunction) =>
    middleware(socket.request as Request, {} as Response, next as NextFunction);

export { sessionMiddleware, wrap };
