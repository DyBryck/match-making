import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/match-making")
  .then(() => {
    console.log("Connexion à MongoDB réussie.");
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB:", error);
  });

import Post from "../models/postSchema.js";

const createPost = async () => {
  try {
    const newPost = await Post.create({
      title: "Titre du post",
      content: "Contenu du post",
    });
    console.log("Nouveau post crée: ", newPost);
  } catch (error) {
    console.error("Erreur lors de la création du post: ", error);
  }
};

mongoose.connection.once("open", async () => {
  await createPost();
  mongoose.disconnect();
});
