import { app } from "./app.js";
import connectMongoDB from "./config/mongooseConfig.js";

const PORT = process.env.PORT || 3000;

connectMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur en écoute sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Le serveur ne démarre pas à cause de l'erreur de connexion DB: ", err);
  });
