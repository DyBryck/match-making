import express from "express";
import * as postController from "../controllers/postController.js";
// import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();
// router.use(authenticate);

router.post("", postController.createPost);
router.get("", postController.getPosts);
router.get("/:post_id", postController.getPostById);
router.put("/:post_id", postController.updatePost);
router.delete("/:post_id", postController.deletePost);
router.get("=:member_id", postController.getPostsByMemberId);
router.get("/game/:game_id", postController.getPostsByGameId);

export default router;
