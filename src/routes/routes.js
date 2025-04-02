import express from "express";
import * as memberController from "../controllers/memberController.js";
import * as postController from "../controllers/postController.js";

const router = express.Router();

// Members
router.get("/members", memberController.getMemberByEmail);
router.get("/members/:id", memberController.getMemberById);
router.post("/members", memberController.createMember);
router.post("/members/login", memberController.loginMember);
router.post("/members/:id/follow", memberController.followMember);

//Posts
router.post("/posts", postController.createPost);
router.get("/posts", postController.getPosts);
router.get("/posts/:post_id", postController.getPostById);
router.get("/posts=:member_id", postController.getPostsByMemberId);
router.put("/posts/:post_id", postController.updatePost);
router.delete("/posts/:post_id", postController.deletePost);

export default router;
