import xss from "xss";
import { RequestHandler } from "express";

export const sanitizeMiddleware: RequestHandler = (req, res, next): void => {
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      req.body[key] = xss(req.body[key]);
    }
  }
  next();
};
