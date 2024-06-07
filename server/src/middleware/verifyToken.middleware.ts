import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(
      authHeader.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET as string,
      (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      }
    );
  } else return res.sendStatus(401);
};
