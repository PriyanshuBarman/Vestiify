import { Router } from "express";
import * as tnxController from "../controllers/tnx.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";

export const tnxRoutes = Router();

tnxRoutes.get("/", authenticate, tnxController.getPortfolioTnx);
tnxRoutes.get("/:symbol", authenticate, tnxController.getStockTnx);
