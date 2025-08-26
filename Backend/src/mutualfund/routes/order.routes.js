import { Router } from "express";
import { isAuthenticated } from "../../shared/middlewares/authMiddleware.js";
import * as orderController from "../controllers/order.controller.js";
import {
  validateRedemptionOrder,
  validateInvestmentOrder,
} from "../validators/order.validator.js";

export const orderRoutes = Router();

orderRoutes.post(
  "/invest",
  isAuthenticated,
  validateInvestmentOrder,
  orderController.placeInvestmentOrder
);

orderRoutes.put(
  "/redeem",
  isAuthenticated,
  validateRedemptionOrder,
  orderController.placeRedemptionOrder
);

orderRoutes.get("/", isAuthenticated, orderController.getOrders);
