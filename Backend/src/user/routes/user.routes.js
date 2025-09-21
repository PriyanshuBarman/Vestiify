import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controller.js";

export const userRoutes = Router();

userRoutes.get("/", authenticate, userController.getMe);
userRoutes.patch(
  "/claim-daily-reward",
  authenticate,
  userController.dailyReward
);
