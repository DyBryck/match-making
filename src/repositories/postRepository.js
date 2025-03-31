import Post from "../models/postSchema.js";

class PostRepository {
  async createPost(postData) {
    try {
      return await Post.create(postData);
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }
}

export default new PostRepository();
