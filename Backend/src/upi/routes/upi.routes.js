import { Router } from "express";
import * as upiController from "../controllers/upi.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { verifyPin } from "../../shared/middlewares/verifyPin.middleware.js";

export const upiRoutes = Router();

upiRoutes.post("/send", authenticate, verifyPin, upiController.sendMoney);
upiRoutes.get("/balance", authenticate, upiController.checkBalance);
upiRoutes.get("/transactions", authenticate, upiController.getAllTnx);
