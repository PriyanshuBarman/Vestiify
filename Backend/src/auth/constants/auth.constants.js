import { NODE_ENV } from "../../../config/env.config.js";

export const TOKEN_EXPIRY = "7d";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
