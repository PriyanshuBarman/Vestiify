import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.utils.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) throw new ApiError(401, "Unauthorized! Please log in to get access.");

  try {
    const validUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: validUser.id };

    return next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }
};
