import { asyncHandler } from "../../../shared/utils/asyncHandler.utils.js";
import * as authService from "../services/auth.service.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const token = await authService.signupUser(name, email, password);

  return res
    .cookie("token", token, COOKIE_OPTIONS)
    .status(201)
    .json({ success: true, message: "User Regestration Sucessfull" });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const token = await authService.loginUser(email, password);

  return res
    .cookie("token", token, COOKIE_OPTIONS)
    .status(200)
    .json({ success: true, message: "User Logged In Successfully" });
});

export const logout = (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    })
    .status(200)
    .json({ success: true, message: "User Logged Out Successfully" });
};
