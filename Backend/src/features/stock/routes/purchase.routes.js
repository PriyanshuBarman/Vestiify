import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/authMiddleware.js";
import * as purchaseController from "../controllers/purchase.controller.js";
import { validatePurchase } from "../validators/purchase.validator.js";

export const purchaseRoutes = Router();

purchaseRoutes.post(
  "/",
  isAuthenticated,
  validatePurchase,
  purchaseController.handlePurchase
);
