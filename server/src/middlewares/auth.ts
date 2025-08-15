import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a custom request interface to include user information
export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

// Middleware to authenticate requests using JWT
const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = {
      id: (decoded as { id: number }).id,
      email: (decoded as { email: string }).email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;

// Middleware to check if the user is authenticated
export const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};
