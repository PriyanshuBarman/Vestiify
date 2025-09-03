import { Router } from "express";
import { isAuthenticated } from "../../shared/middlewares/authMiddleware.js";
import * as userController from "../controllers/user.controller.js";
import * as walletController from "../controllers/wallet.controller.js";
import * as tnxController from "../controllers/transaction.controller.js";

export const userRoutes = Router();

userRoutes.get("/", isAuthenticated, userController.getUser);
userRoutes.get("/balance", isAuthenticated, walletController.getBalance);
userRoutes.put("/deposit", isAuthenticated, walletController.deposit);
userRoutes.get("/transactions", isAuthenticated, tnxController.getAllTnx);
