import { Router } from "express";
import { profileRoutes } from "./profile.routes.js";
import { userRoutes } from "./user.routes.js";

const router = Router();

router.use("/", userRoutes);
router.use("/profiles", profileRoutes);

export default router;
