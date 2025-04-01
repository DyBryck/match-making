import * as PostService from "../services/postService.js";
import { handleRequest } from "../utils/utils.js";

export const createPost = handleRequest(async (req) => {
  const newPost = await PostService.createPost(req.body);
  return { message: "Post crée:", data: newPost };
});

export const getPosts = handleRequest(async () => {
  const posts = await PostService.getPosts();
  return { message: "Posts trouvés:", data: posts };
});

export const getPostById = handleRequest(async (req) => {
  const post = await PostService.getPostById(req.params.post_id);
  return { message: "Post trouvé:", data: post };
});

export const updatePost = handleRequest(async (req) => {
  const updatedPost = await PostService.updatePost(req.params.post_id, req.body);
  return { message: "Post mis à jour:", data: updatedPost };
});

export const deletePost = handleRequest(async (req) => {
  const deletedPost = await PostService.deletePost(req.params.post_id);
  return { message: "Post supprimé:", data: deletedPost };
});
