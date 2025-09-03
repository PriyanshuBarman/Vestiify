import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as sellController from "../controllers/sell.controller.js";
import {
  validateSellAllQty,
  validateSellSomeQty,
} from "../validators/sell.validator.js";

export const sellRoutes = Router();

sellRoutes.put(
  "/",
  authenticate,
  validateSellSomeQty,
  sellController.sellSomeQty
);

sellRoutes.delete(
  "/",
  authenticate,
  validateSellAllQty,
  sellController.sellAllQty
);
