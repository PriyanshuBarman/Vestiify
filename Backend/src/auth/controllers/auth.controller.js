import { asyncHandler } from "../../shared/utils/asyncHandler.utils.js";
import * as authService from "../services/auth.service.js";
import { NODE_ENV } from "../../../config/env.config.js";
import { COOKIE_OPTIONS } from "../constants/auth.constants.js";
import { ApiError } from "../../shared/utils/apiError.utils.js";

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
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "strict",
    })
    .status(200)
    .json({ success: true, message: "User Logged Out Successfully" });
};

export const setPin = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { pin } = req.body;

  if (!pin) {
    throw new ApiError(400, "PIN is required");
  }

  await authService.setPin(userId, pin);

  return res
    .status(200)
    .json({ success: true, message: "PIN Set Successfully" });
});
