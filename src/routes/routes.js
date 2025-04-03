import express from "express";
import * as memberController from "../controllers/memberController.js";
import * as gameController from "../controllers/gameController.js";
// import * as postController from "../controllers/postController.js";

const router = express.Router();

router.get("/members", memberController.getMemberByEmail);
router.post("/members", memberController.createMember);
router.get("/games", gameController.getGameById);
router.post("/game", gameController.createGame);
// router.post("/members/login", memberController.loginMember);
// router.post("/posts", postController.createPost);

export default router;
