import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../db";
import { eq } from "drizzle-orm";
import { users } from "../schema";

export type UserFromDB = {
  user_id?: number;
  name?: string;
  email?: string;
  passhash?: string;
  photo_url?: string;
  bio?: string;
  registration_date?: Date;
};
export interface RequestUserAttached extends Request {
  id?: number;
  user?: UserFromDB;
}
1;

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, please login");
      }
      // verify token
      const verified = jwt.verify(
        token,
        String(process.env.JWT_SECRET)
      ) as JwtPayload;
      // get userID from token
      const user = await db.query.users.findFirst({
        where: eq(users.user_id, verified.id),
        columns: { passhash: false },
      });
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }
  }
);
