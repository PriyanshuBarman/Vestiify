import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as watchlistService from "../controllers/watchlist.controller.js";

export const watchlistRoutes = Router();

watchlistRoutes.post("/", authenticate, watchlistService.addToWatchlist);
watchlistRoutes.delete(
  "/:schemeCode",
  authenticate,
  watchlistService.removeFromWatchlist
);
watchlistRoutes.get("/", authenticate, watchlistService.getWatchlist);
