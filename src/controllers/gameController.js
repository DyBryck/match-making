import { handleRequest } from "../utils/utils.js";
import * as gameService from "../services/gameService.js";
import { validateGame } from "../validators/gameValidator.js";

export const getGameById = handleRequest(async (req) => {
  const gameFound = await gameService.getGameById(req.query);
  return { message: "Jeu trouvé", data: gameFound };
});

export const createGame = handleRequest(async (req) => {
  console.log("Données reçues:", req.body); // ✅ Log pour debug

  const errors = validateGame(req.body);
  if (errors.length > 0) {
    console.error("Erreur de validation:", errors); // ✅ Affiche les erreurs pour debug
    throw new Error(errors.join(", ")); // ❌ Stoppe immédiatement l'exécution
  }

  const newGame = await gameService.createGame(req.body);
  return { message: "Jeu ajouté avec succès !", data: newGame };
});
