import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.utils.js";
import { JWT_SECRET } from "../../../config/env.config.js";

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized! Please log in to get access.");
  }

  try {
    const validUser = jwt.verify(token, JWT_SECRET);

    req.user = { userId: validUser.id };
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired. Please log in again.");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Unauthorized: Invalid token");
    } else {
      throw new ApiError(401, "Unauthorized: Token verification failed");
    }
  }
};
