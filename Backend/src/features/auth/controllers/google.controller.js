import { OAuth2Client } from "google-auth-library";
import { asyncHandler } from "../../../utils/asyncHandler.utils.js";
import { userRepo } from "../../user/repositories/user.repository.js";

const client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

export const googleAuth = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const { tokens } = await client.getToken(code);

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.CLIENT_ID,
  });

  const { email, name, picture } = ticket.getPayload();

  const existingUser = await userRepo.findUnique({ email });

  if (!existingUser) {
    await userRepo.create({ name, email, avatar: picture });
    return res
      .status(200)
      .json({ success: true, message: "User Registered Successfully" });
  }

  return res.status(200).json({ success: true, message: "Login Successful" });
});
