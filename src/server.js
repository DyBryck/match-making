import cors from "cors";
import express from "express";
import router from "./routes/routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

app.listen(PORT, () => {
  console.log(`Server en écoute sur le port ${PORT}`);
});
