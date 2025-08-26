import { Router } from "express";
import { purchaseRoutes } from "./purchase.routes.js";
import { sellRoutes } from "./sell.routes.js";
import { tnxRoutes } from "./tnx.routes.js";
import { portfolioRoutes } from "./portfolio.routes.js";

export const stockRoutes = Router();

stockRoutes.use("/purchase", purchaseRoutes);
stockRoutes.use("/sell", sellRoutes);
stockRoutes.use("/tnx", tnxRoutes);
stockRoutes.use("/portfolio", portfolioRoutes);
