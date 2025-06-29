import { Router } from "express";
import { isAuthenticated } from "../../../shared/middlewares/authMiddleware.js";
import { getWatchlist } from "../controllers/watchlist.controller.js";

export const watchlistRoutes = Router();

watchlistRoutes.get("/", isAuthenticated, getWatchlist);
