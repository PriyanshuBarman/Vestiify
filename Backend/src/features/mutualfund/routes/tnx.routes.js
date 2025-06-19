import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/authMiddleware.js";
import * as tnxController from "../controllers/tnx.controller.js";

export const tnxRoutes = Router();

tnxRoutes.get("/", isAuthenticated, tnxController.getPortfolioTnx);
tnxRoutes.get("/:fundCode", isAuthenticated, tnxController.getFundTnx);
