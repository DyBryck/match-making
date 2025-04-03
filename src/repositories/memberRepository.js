import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../utils/prismaErrorUtils.js";

const prisma = new PrismaClient();

export const getMemberById = async (id) =>
  prismaErrorHandler(() =>
    prisma.member.findUniqueOrThrow({
      where: { member_id: id },
    }),
  );

export const getMemberByEmail = async (email) =>
  prismaErrorHandler(() =>
    prisma.member.findUniqueOrThrow({
      where: { email: email },
    }),
  );

export const createMember = async (data) =>
  prismaErrorHandler(() =>
    prisma.member.create({
      data: data,
    }),
  );

export const followMember = async (followerId, followedId) =>
  prismaErrorHandler(() =>
    prisma.member_follow.create({
      data: {
        follower_id: followerId,
        followed_id: followedId,
      },
    }),
  );
