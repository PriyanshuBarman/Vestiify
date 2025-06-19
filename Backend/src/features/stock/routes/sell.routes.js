import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/authMiddleware.js";
import * as sellController from "../controllers/sell.controller.js";
import { validateSellAllQty, validateSellSomeQty } from "../validators/sell.validator.js";

export const sellRoutes = Router();

sellRoutes.put("/", isAuthenticated, validateSellSomeQty, sellController.sellSomeQty);

sellRoutes.delete("/", isAuthenticated, validateSellAllQty, sellController.sellAllQty);
