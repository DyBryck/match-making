import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function resetSequences() {
  await prisma.$executeRaw`TRUNCATE TABLE "member" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "member_follow" RESTART IDENTITY CASCADE`;
  // Si t'as d'autres tables, tu peux les ajouter ici ou utiliser une boucle pour toutes les tables du schéma "public"
}

resetSequences()
  .then(() => {
    console.log("Séquences réinitialisées !");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
