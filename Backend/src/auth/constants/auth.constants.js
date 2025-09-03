import { NODE_ENV } from "../../../config/env.config.js";

export const TOKEN_EXPIRY = "90d";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: NODE_ENV === "production" ? "none" : "strict",
  maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
};
