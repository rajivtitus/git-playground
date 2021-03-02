import express from "express";
//Import Controllers/Handlers
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postsHandler.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", verifyToken, createPost);
router.patch("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
router.patch("/:id/like", verifyToken, likePost);

export default router;
