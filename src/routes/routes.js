import express from "express";
import * as memberController from "../controllers/memberController.js";
// import * as postController from "../controllers/postController.js";

const router = express.Router();

router.get("/members", memberController.getMemberByEmail);
router.get("/members/:id", memberController.getMemberById);
router.post("/members", memberController.createMember);
router.post("/members/login", memberController.loginMember);
router.post("/members/:id/follow", memberController.followMember);
// router.post("/posts", postController.createPost);

export default router;
