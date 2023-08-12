import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).send(err);
};
