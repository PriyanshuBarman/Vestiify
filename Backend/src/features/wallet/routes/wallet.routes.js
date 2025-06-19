import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/authMiddleware.js";
import * as walletController from "../controllers/wallet.controller.js";

export const balanceRoutes = Router();

balanceRoutes.get("/balance", isAuthenticated, walletController.getBalance);
balanceRoutes.put("/deposit", isAuthenticated, walletController.deposit);
