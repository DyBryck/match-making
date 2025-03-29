import express from "express";
import * as memberController from "../controllers/memberController.js";

const router = express.Router();

router.post("/members", memberController.createMember);

export default router;
