import * as postRepository from "../repositories/postRepository.js";
import { validatePost, validatePostId } from "../validators/postValidator.js";
import { getMemberById } from "./memberService.js";
import { getGameById } from "./gameService.js";
export const createPost = async (body) => {
  // Validate post data
  const validation = validatePost(body);
  if (!validation.isValid) {
    console.log("Validation errors:", validation.errors);
    throw new Error(Object.values(validation.errors).join(", "));
  }

  const { title, content, media_link, authorId,gameId} = body;
  const membre =await getMemberById({id:authorId});
  if (!membre) {
    throw new Error('Membre introuvable');
  }
  const game = await getGameById({ id: gameId });
  if (!game) {
    throw new Error('Jeu introuvable');
  }
  const postData = { title, content, media_link,authorId,gameId};
  const newPost = await postRepository.createPost(postData);
  return newPost;
};

export const getPosts = async () => {
  const posts = await postRepository.getPosts();
  return posts;
};

export const getPostById = async (post_id) => {
  // Validate post ID
  const validation = validatePostId(post_id);
  if (!validation.isValid) {
    console.log("Validation errors:", validation.errors);
    throw new Error(Object.values(validation.errors).join(", "));
  }

  const post = await postRepository.getPostById(post_id);
  if (!post) throw new Error("Post non trouvé");
  return post;
};

export const updatePost = async (post_id, body) => {
  // Validate post ID
  const idValidation = validatePostId(post_id);
  if (!idValidation.isValid) {
    console.log("Validation errors:", idValidation.errors);
    throw new Error(Object.values(idValidation.errors).join(", "));
  }

  // Validate post data
  const validation = validatePost(body);
  if (!validation.isValid) {
    console.log("Validation errors:", validation.errors);
    throw new Error(Object.values(validation.errors).join(", "));
  }

  const { title, content, media_link } = body;
  const postData = { title, content, media_link };
  const updatedPost = await postRepository.updatePost(post_id, postData);
  return updatedPost;
};

export const deletePost = async (post_id) => {
  // Validate post ID
  const validation = validatePostId(post_id);
  if (!validation.isValid) {
    console.log("Validation errors:", validation.errors);
    throw new Error(Object.values(validation.errors).join(", "));
  }

  const deletedPost = await postRepository.deletePost(post_id);
  return deletedPost;
};
//relation post-member

export const getPostsByMemberId = async (member_id) => {
  const posts = await postRepository.getPostsByMemberId(member_id);
  return posts;
};
export const getPostsByGameId = async (game_id) => {
  // Vérifier si le jeu existe
  const game = await getGameById({ id: game_id });
  if (!game) {
    throw new Error('Jeu introuvable');
  }
  const posts = await postRepository.getPostsByGameId(game_id);
  return posts;
};
