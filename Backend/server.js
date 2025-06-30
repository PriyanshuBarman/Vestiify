import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/shared/middlewares/errorHandler.js";
import { notFoundHandler } from "./src/shared/middlewares/notFoundHandler.js";
import { authRoutes } from "./src/features/auth/routes/auth.routes.js";
import { mutualFundRoutes } from "./src/features/mutualfund/routes/index.routes.js";
import { stockRoutes } from "./src/features/stock/routes/index.routes.js";
import { userRoutes } from "./src/features/user/routes/user.routes.js";
import { walletRoutes } from "./src/features/wallet/routes/index.routes.js";
import "./src/cron/cronRunner.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/mutual-funds", mutualFundRoutes);
app.use("/api/v1/stock", stockRoutes);

app.use("/ping", (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.all("*", notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
