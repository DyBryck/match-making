import express from "express";
import * as postController from "../controllers/postController.js";

const router = express.Router();

router.post("", postController.createPost);
router.get("", postController.getPosts);
router.get("/:post_id", postController.getPostById);
router.put("/:post_id", postController.updatePost);
router.delete("/:post_id", postController.deletePost);

export default router;
