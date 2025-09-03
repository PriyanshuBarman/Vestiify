import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { FRONTEND_URL } from "./config/env.config.js";
import { authRoutes } from "./src/auth/routes/auth.routes.js";
import { mutualFundRoutes } from "./src/mutualfund/routes/index.routes.js";
import { errorHandler } from "./src/shared/middlewares/error.middleware.js";
import { notFoundHandler } from "./src/shared/middlewares/notFound.middleware.js";
import { stockRoutes } from "./src/stock/routes/index.routes.js";
import { userRoutes } from "./src/user/routes/user.routes.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
// app.use(cors({ origin: "http://10.18.42.9:5173", credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/mutual-funds", mutualFundRoutes);
app.use("/api/v1/stock", stockRoutes);

app.use("/ping", (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.all("*", notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
