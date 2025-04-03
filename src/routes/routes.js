import express from "express";
import * as authController from "../controllers/authController.js";
import * as gameController from "../controllers/gameController.js";
import * as memberController from "../controllers/memberController.js";
import * as postController from "../controllers/postController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

// Members
router.get("/members", memberController.getMemberByEmail);
router.get("/members/:id", memberController.getMemberById);
router.post("/members", memberController.createMember);
router.post("/members/login", memberController.loginMember);
router.post("/members/:id/follow", memberController.followMember);

// Jeux
router.get("/games/:id", gameController.getGameById);
router.post("/games", gameController.createGame);

// Authentification
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshTokens);
router.post("/logout", authController.logout);

// Test route protégée
router.get("/test", authenticate, (req, res) => {
  res.status(200).json({ message: "Utilisateur connecté" });
});

//Posts
router.post("/posts", postController.createPost);
router.get("/posts", postController.getPosts);
router.get("/posts/:post_id", postController.getPostById);
router.put("/posts/:post_id", postController.updatePost);
router.delete("/posts/:post_id", postController.deletePost);

export default router;
