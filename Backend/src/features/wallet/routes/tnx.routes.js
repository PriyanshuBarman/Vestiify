import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/authMiddleware.js";
import * as tnxController from "../controllers/transaction.controller.js";

export const tnxRoutes = Router();

tnxRoutes.get("/", isAuthenticated, tnxController.getAllTnx);
