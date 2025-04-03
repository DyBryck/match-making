import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findById = async (id) => {
  return await prisma.jeu.findUnique({
    where: { game_id: id },
  });
};

export const createGame = async (gameData) => {
  return await prisma.jeu.create({
    data: {
      name: gameData.name,
      published_date: new Date(gameData.published_date || Date.now()), // Gère la date
      link: gameData.link,
      description: gameData.description || null, // Permet d'accepter un champ vide
    },
  });
};
