import Post from "../models/postSchema.js";

export const createPost = async (postData) => {
  const newPost = await Post.create(postData);
  return newPost;
};
export const getPosts = async () => {
  const posts = await Post.find();
  return posts;
};
export const getPostById = async (post_id) => {
  const post = await Post.findOne({post_id});
  return post;
};
export const updatePost = async (post_id, postData) => {
  const updatedPost = await Post.findOneAndUpdate({post_id}, postData, {new: true});
  return updatedPost;
}
export const deletePost = async (post_id) => {
  const deletedPost = await Post.findOneAndDelete({post_id});
  return deletedPost;
}
//relation membre 
export const getPostsByMemberId = async (member_id) => {
  const posts = await Post.find({ authorId:Number(member_id) });
  return posts;
};
export const getPostsByGameId = async (game_id) => {
  const posts = await Post.find({ gameId: Number(game_id) }).sort({ created_at: -1 });
  return posts;
};