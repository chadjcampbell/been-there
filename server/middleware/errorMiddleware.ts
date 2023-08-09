import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";

const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorHandler;
