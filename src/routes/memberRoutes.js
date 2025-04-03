import express from "express";
import * as memberController from "../controllers/memberController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/", memberController.getMemberByEmail);
router.get("/:id", memberController.getMemberById);
router.post("/:id/follow", memberController.followMember);

export default router;
