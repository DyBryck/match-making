import * as gameRepository from "../repositories/gameRepository.js";
import { NotFoundError } from "../errors/customErrors.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getGameById = async (query) => {
  const gameFound = await gameRepository.findById(parseInt(query.id));

  if (!gameFound) {
    throw new NotFoundError("Jeu non trouvé");
  }

  return gameFound;
};

export const createGame = async (gameData) => {
  // Vérifie si un jeu avec ce nom existe déjà
  const existingGame = await prisma.jeu.findUnique({
    where: { name: gameData.name },
  });

  if (existingGame) {
    throw new Error(`Le jeu "${gameData.name}" existe déjà !`);
  }

  // Insérer le jeu si tout est bon
  return await prisma.jeu.create({
    data: gameData,
  });
};
