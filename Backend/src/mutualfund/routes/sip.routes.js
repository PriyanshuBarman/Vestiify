import { Router } from "express";
import { isAuthenticated } from "../../shared/middlewares/authMiddleware.js";
import { validateSip } from "../validators/sip.validator.js";
import * as sipController from "../controllers/sip.controller.js";

export const sipRoutes = Router();

sipRoutes.post("/", isAuthenticated, validateSip, sipController.startSip);
sipRoutes.put("/edit", isAuthenticated, sipController.editSip);
sipRoutes.get("/", isAuthenticated, sipController.getAllSips);
