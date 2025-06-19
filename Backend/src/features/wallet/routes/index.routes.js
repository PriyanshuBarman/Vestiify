import { Router } from "express";
import { tnxRoutes } from "./tnx.routes.js";
import { balanceRoutes } from "./wallet.routes.js";

export const walletRoutes = Router();

walletRoutes.use("/", balanceRoutes);
walletRoutes.use("/tnx", tnxRoutes);
