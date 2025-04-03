import { BadRequestError } from "../errors/customErrors.js";
import * as gameService from "../services/gameService.js";
import { handleRequest } from "../utils/utils.js";
import { validateGame } from "../validators/gameValidator.js";

export const getGameById = handleRequest(async (req) => {
  const gameFound = await gameService.getGameById(req.params);
  return { message: "Jeu trouvé", data: gameFound };
});

export const createGame = handleRequest(async (req) => {
  const errors = validateGame(req.body);
  if (errors.length > 0) {
    console.error("Erreur de validation:", errors);
    throw new BadRequestError(errors.join(", "));
  }

  const newGame = await gameService.createGame(req.body);
  return { message: "Jeu ajouté avec succès !", data: newGame };
});
