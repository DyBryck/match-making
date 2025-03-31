import PostService from "../services/postService.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, media_link } = req.body;
    const newPost = await PostService.createPost(title, content, media_link);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
