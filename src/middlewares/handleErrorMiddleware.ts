import { NextFunction, Request, Response } from "express";

export function handleErrorMiddleware(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "conflict") {
    return res.sendStatus(409);
  }

  console.log(error);
  res.sendStatus(500);
}