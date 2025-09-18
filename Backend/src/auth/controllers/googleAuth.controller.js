import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  JWT_SECRET,
} from "../../../config/env.config.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import { userRepo } from "../../shared/repositories/index.repository.js";
import { COOKIE_OPTIONS, TOKEN_EXPIRY } from "../constants/auth.constants.js";
import { generateUniqueUsername } from "../services/auth.service.js";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, "postmessage");

export const googleAuth = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const { tokens } = await client.getToken(code);

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: CLIENT_ID,
  });

  const { email, name, picture } = ticket.getPayload();

  let user = await userRepo.findUnique({ email });
  let isNewUser = false;

  if (!user) {
    const username = await generateUniqueUsername(name);
    user = await userRepo.create({ name, email, avatar: picture, username });
    isNewUser = true;
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  return res
    .cookie("token", token, COOKIE_OPTIONS)
    .status(isNewUser ? 201 : 200)
    .json({
      success: true,
      message: isNewUser ? "User Registered Successfully" : "Login Successful",
    });
});
