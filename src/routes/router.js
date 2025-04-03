import express from "express";
import authRoutes from "./authRoutes.js";
import gameRoutes from "./gameRoutes.js";
import memberRoutes from "./memberRoutes.js";
import postRoutes from "./postRoutes.js";

const router = express.Router();

router.use("/member", memberRoutes);
router.use("/game", gameRoutes);
router.use("/auth", authRoutes);
router.use("/post", postRoutes);

export default router;
