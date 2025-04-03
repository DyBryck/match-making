import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../utils/prismaErrorUtils.js";

const prisma = new PrismaClient();

export const findById = async (id) => {
  return await prisma.game.findUnique({
    where: { game_id: id },
  });
};

export const createGame = async (data) =>
  prismaErrorHandler(async () =>
    prisma.game.create({
      data: data,
    }),
  );
