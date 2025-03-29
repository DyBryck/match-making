import mongoose from "mongoose";

const connectMongoDB = async () => {
  mongoose
    .connect("mongodb://localhost:27017/match-making")
    .then(() => {
      console.log("Connexion à MongoDB réussie.");
    })
    .catch((error) => {
      console.error("Erreur de connexion à MongoDB: ", error);
    });
};

export default connectMongoDB;
