import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/authMiddleware.js";
import * as userController from "../controllers/user.controller.js";

export const userRoutes = Router();

userRoutes.get("/", isAuthenticated, userController.getUser);
