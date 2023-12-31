import { redisClient } from "../redis";
import { Request, Response, NextFunction } from "express";

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.socket.remoteAddress as string;

  await redisClient
    .multi()
    .incr(ip)
    .expire(ip, 60)
    .exec((err, result) => {
      if (result && (result[0][1] as number) > 3) {
        res.status(400);
        err = new Error("Too many requests. Try again later.");
        next(err);
      }
    });
  next();
};

export default rateLimiter;
