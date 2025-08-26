import { Router } from "express";
import { isAuthenticated } from "../../shared/middlewares/authMiddleware.js";
import * as watchlistService from "../controllers/watchlist.controller.js";

export const watchlistRoutes = Router();

watchlistRoutes.get("/", isAuthenticated, watchlistService.getWatchlist);
watchlistRoutes.post("/add", isAuthenticated, watchlistService.addToWatchlist);
watchlistRoutes.delete(
  "/remove",
  isAuthenticated,
  watchlistService.removeFromWatchlist
);
