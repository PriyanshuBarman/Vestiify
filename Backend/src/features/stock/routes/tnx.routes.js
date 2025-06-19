import { Router } from "express";
import * as tnxController from "../controllers/tnx.controller.js";
import { isAuthenticated } from "../../../middlewares/authMiddleware.js";

export const tnxRoutes = Router();

tnxRoutes.get("/", isAuthenticated, tnxController.getPortfolioTnx);
tnxRoutes.get("/:symbol", isAuthenticated, tnxController.getStockTnx);
