import cors from "cors";
import express from "express";
import router from "./routes/routes.js";
import connectMongoDB from "./utils/connectMongoose.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

connectMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur en écoute sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Le serveur ne démarre pas à cause de l'erreur de connexion DB: ", err);
  });
