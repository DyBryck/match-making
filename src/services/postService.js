import PostRepository from "../repositories/postRepository.js";

class PostService {
  async createPost(title, content, media_link) {
    if (!title || !content) {
      throw new Error("Title and content are required.");
    }

    const postData = { title, content, media_link };
    return await PostRepository.createPost(postData);
  }
}

export default new PostService();
