import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/authMiddleware.js";
import * as redemptionController from "../controllers/redemption.controller.js";
import {
  validateFullRedemption,
  validatePartialRedemption,
} from "../validators/redemption.validator.js";

export const redemptionRoutes = Router();

redemptionRoutes.delete(
  "/:fundCode?",
  isAuthenticated,
  validateFullRedemption,
  redemptionController.fullRedemption
);

redemptionRoutes.put(
  "/:fundCode?",
  isAuthenticated,
  validatePartialRedemption,
  redemptionController.partialRedemption
);
