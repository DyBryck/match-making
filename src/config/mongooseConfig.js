import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Connexion à MongoDB réussie.");
    })
    .catch((error) => {
      console.error("Erreur de connexion à MongoDB: ", error);
    });
};

export default connectMongoDB;
