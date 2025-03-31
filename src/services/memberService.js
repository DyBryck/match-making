import { NotFoundError } from "../errors/customErrors.js";
import * as memberRepository from "../repositories/memberRepository.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { validateAndThrow } from "../utils/validatorUtils.js";
import { validateMember } from "../validators/memberValidator.js";

export const getMemberByEmail = async (email) => {
  const memberFound = await memberRepository.getMemberByEmail(email);

  if (!memberFound) {
    throw new NotFoundError("Membre introuvable");
  }

  return memberFound;
};

export const createMember = async (body) => {
  validateAndThrow(validateMember(body));

  const hashedPassword = await hashPassword(body.password);
  const memberData = {
    ...body,
    birthdate: new Date(body.birthdate),
    password: hashedPassword,
  };

  const member = await memberRepository.createMember(memberData);
  return member;
};
