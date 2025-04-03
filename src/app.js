import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import router from "./routes/routes.js";

export const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});
