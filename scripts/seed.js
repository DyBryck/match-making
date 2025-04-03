import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import mongoose from "mongoose";
import Post from "../src/models/postSchema.js";
import { hashPassword } from "../src/utils/passwordUtils.js";

const prisma = new PrismaClient();
const mongoURI = process.env.MONGODB_URI;

const seedPosts = async () => {
  mongoose.connect(mongoURI);
  console.log("Connexion à MongoDB réussie");

  await Post.deleteMany();
  console.log("Collection 'posts' vidée");

  const posts = [
    {
      title: "Première victoire !",
      content: "Je viens de finir Elden Ring, quel jeu incroyable.",
      media_link: "https://example.com/image1.jpg",
      member_id: 1,
      game_id: 1,
    },
    {
      title: "À la recherche d’un coéquipier",
      content: "Quelqu’un pour jouer à Valorant ce soir ?",
      member_id: 2,
      game_id: 2,
    },
    {
      title: "Mes impressions sur Baldur's Gate 3",
      content: "L'écriture est dingue, je suis conquis.",
      media_link: "https://example.com/bg3.png",
      member_id: 3,
      game_id: 3,
    },
  ];

  await Post.insertMany(posts);
  console.log("Données de test insérées dans MongoDB");

  await mongoose.disconnect();
};

const seedPrisma = async () => {
  const [alice, bob, claire] = await Promise.all([
    prisma.member.create({
      data: {
        pseudo: "alicegamer",
        first_name: "Alice",
        last_name: "Martin",
        birthdate: new Date("1995-01-01"),
        email: "alice@example.com",
        password: await hashPassword("motdepasse"),
        bio: "Fan de RPG",
      },
    }),
    prisma.member.create({
      data: {
        pseudo: "bobpro",
        first_name: "Bob",
        last_name: "Durand",
        birthdate: new Date("1990-06-15"),
        email: "bob@example.com",
        password: await hashPassword("motdepasse"),
      },
    }),
    prisma.member.create({
      data: {
        pseudo: "clairefps",
        first_name: "Claire",
        last_name: "Lemoine",
        birthdate: new Date("1998-09-20"),
        email: "claire@example.com",
        password: await hashPassword("motdepasse"),
      },
    }),
  ]);

  await prisma.member_follow.createMany({
    data: [
      { follower_id: alice.member_id, followed_id: bob.member_id },
      { follower_id: bob.member_id, followed_id: claire.member_id },
    ],
  });

  await prisma.game.createMany({
    data: [
      {
        name: "Elden Ring",
        published_date: new Date("2022-02-25"),
        link: "https://eldenring.com",
        description: "Un chef-d'œuvre du RPG dark fantasy",
      },
      {
        name: "Valorant",
        published_date: new Date("2020-06-02"),
        link: "https://playvalorant.com",
        description: "FPS tactique compétitif signé Riot Games",
      },
    ],
  });

  await prisma.event.createMany({
    data: [
      {
        name: "Elden Ring World Tour",
        date: new Date("2023-03-15"),
        link: "https://eldenringevent.com",
        description: "Compétition internationale",
      },
      {
        name: "Valorant Masters",
        date: new Date("2024-07-10"),
        link: "https://valorantmasters.gg",
        description: "Tournoi pro Riot",
      },
    ],
  });

  console.log("Données insérées dans PostgreSQL");
};

const main = async () => {
  try {
    await seedPrisma();
    await seedPosts();
    console.log("Seed global terminé avec succès !");
  } catch (err) {
    console.error("Erreur dans le seed global :", err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

main();
