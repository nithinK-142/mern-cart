import type { Request, Response, NextFunction } from "express";

const faviconMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.originalUrl === "/favicon.ico" ||
    req.originalUrl === "/favicon.png"
  ) {
    res.status(204).end();
    return;
  }
  next();
};

export default faviconMiddleware;
