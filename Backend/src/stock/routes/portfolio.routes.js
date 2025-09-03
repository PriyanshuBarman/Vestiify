import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as portfolioController from "../controllers/portfolio.controller.js";
import { validateQuery } from "../validators/portfolioQuery.validator.js";

export const portfolioRoutes = Router();

portfolioRoutes.get(
  "/",
  authenticate,
  validateQuery,
  portfolioController.getPortfolio
);

portfolioRoutes.get(
  "/summary",
  authenticate,
  portfolioController.getUserPortfolio
);

portfolioRoutes.get("/:symbol?", authenticate, portfolioController.getStock);
