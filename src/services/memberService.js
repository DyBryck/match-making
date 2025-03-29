import { PrismaClient } from "@prisma/client";
import { validateMember } from "../validators/memberValidator.js";

const prisma = new PrismaClient();

export const createMember = async (body) => {
  const memberData = {
    ...body,
    birthdate: new Date("1996-02-13"),
  };

  validateMember(memberData);

  const member = await prisma.member.create({
    data: memberData,
  });
  return member;
};
