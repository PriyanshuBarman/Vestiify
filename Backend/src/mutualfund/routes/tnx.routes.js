import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as tnxController from "../controllers/tnx.controller.js";

export const tnxRoutes = Router();

tnxRoutes.get("/", authenticate, tnxController.getPortfolioTnx);

tnxRoutes.get("/:fundCode", authenticate, tnxController.getFundTnx);
