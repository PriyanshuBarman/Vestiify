import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/authMiddleware.js";
import * as investmentController from "../controllers/investment.controller.js";
import { validateInvestment } from "../validators/investment.validator.js";

export const investmentRoutes = Router();

investmentRoutes.post(
  "/",
  isAuthenticated,
  validateInvestment,
  investmentController.handleInvest
);
