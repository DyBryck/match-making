import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMemberByEmail = async (email) => {
  const member = await prisma.member.findUnique({
    where: {
      email: email,
    },
  });
  return member;
};

export const createMember = async (body) => {
  const member = await prisma.member.create({
    data: body,
  });
  return member;
};
