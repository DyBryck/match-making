import express from "express";
import * as authController from "../controllers/authController.js";
import * as memberController from "../controllers/memberController.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshTokens);
router.post("/logout", authController.logout);
router.post("/sign-up", memberController.createMember);

export default router;
