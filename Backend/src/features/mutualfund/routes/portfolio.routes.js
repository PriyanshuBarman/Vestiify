import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/authMiddleware.js";
import * as portfolioController from "../controllers/portfolio.controller.js";
import { validateQuery } from "../validators/query.validator.js";

export const portfolioRoutes = Router();

portfolioRoutes.get("/summary", isAuthenticated, portfolioController.getPortfolioSummary);

portfolioRoutes.get(
  "/",
  isAuthenticated,
  validateQuery,
  portfolioController.getPortfolio
);

portfolioRoutes.get("/:fundCode?", isAuthenticated, portfolioController.getFund);


