import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/index.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
