import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMember = async (body) => {
  const member = await prisma.member.create({
    data: body,
  });
  return member;
};
