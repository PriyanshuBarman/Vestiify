import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controller.js";

export const userRoutes = Router();

userRoutes.get("/search", authenticate, userController.search);
userRoutes.get("/me", authenticate, userController.getUser);
userRoutes.patch(
  "/me/claim-daily-reward",
  authenticate,
  userController.dailyReward
);
