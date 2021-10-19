import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ errorCode: "token.invalid" });
  }

  const splitedAuthorization = authorization.split(" ");

  if (splitedAuthorization.length != 2 && splitedAuthorization[0] != "Bearer") {
    return res.status(401).json({ errorCode: "token.invalid.bearer" });
  }

  try {
    const { sub } = jwt.verify(
      splitedAuthorization[1],
      String(process.env.JWT_SECRET)
    ) as IPayload;

    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).json({ errorCode: "token.expired" });
  }
}
