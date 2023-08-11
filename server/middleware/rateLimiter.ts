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
        return res.json({
          loggedIn: false,
          status: "Too many attempts. Try again later.",
        });
      }
      next();
    });
};

export default rateLimiter;
