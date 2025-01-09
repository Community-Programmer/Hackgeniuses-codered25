import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return next(createHttpError(401, "Authorization token is required."));
  }

  try {
 
    const decoded = verify(token, process.env.REFRESH_JWT_SECRET as string);
    const _req = req as AuthRequest;
    console.log(decoded)
    _req.userId = decoded.sub as string;

    next();
  } catch (err) {
    return next(createHttpError(401, "Token expired."));
  }
};

export default authenticate;