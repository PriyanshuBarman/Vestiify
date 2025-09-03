import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controller.js";
import * as walletController from "../controllers/wallet.controller.js";
import * as tnxController from "../controllers/transaction.controller.js";

export const userRoutes = Router();

userRoutes.get("/", authenticate, userController.getUser);
userRoutes.get("/balance", authenticate, walletController.getBalance);
userRoutes.put("/deposit", authenticate, walletController.deposit);
userRoutes.get("/transactions", authenticate, tnxController.getAllTnx);
