import { Router } from "express";
import { isAuthenticated } from "../../../shared/middlewares/authMiddleware.js";
import * as redemptionController from "../controllers/redemption.controller.js";
import {
  validateFullRedemption,
  validatePartialRedemption,
} from "../validators/redemption.validator.js";

export const redemptionRoutes = Router();

redemptionRoutes.delete(
  "/:schemeCode?",
  isAuthenticated,
  validateFullRedemption,
  redemptionController.fullRedemption
);

redemptionRoutes.put(
  "/:schemeCode?",
  isAuthenticated,
  validatePartialRedemption,
  redemptionController.partialRedemption
);
