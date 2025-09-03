import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as purchaseController from "../controllers/purchase.controller.js";
import { validatePurchase } from "../validators/purchase.validator.js";

export const purchaseRoutes = Router();

purchaseRoutes.post(
  "/",
  authenticate,
  validatePurchase,
  purchaseController.handlePurchase
);
