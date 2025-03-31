import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import * as memberRepository from "../repositories/memberRepository.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { validateAndThrow } from "../utils/validatorUtils.js";
import { validateMember } from "../validators/memberValidator.js";

export const getMemberByEmail = async (body) => {
  const { email } = body;
  const memberFound = await memberRepository.getMemberByEmail(email);

  if (!memberFound) {
    throw new NotFoundError("Membre introuvable");
  }

  return memberFound;
};

export const createMember = async (body) => {
  validateAndThrow(validateMember(body));

  const { birthdate, password } = body;

  const hashedPassword = await hashPassword(password);
  const memberData = {
    ...body,
    birthdate: new Date(birthdate),
    password: hashedPassword,
  };

  const member = await memberRepository.createMember(memberData);
  if (!member) {
    throw new Error("Erreur lors de la création du membre");
  }

  return member;
};

export const loginMember = async (body) => {
  const { email, password } = body;

  const memberFound = await getMemberByEmail(email);
  if (!memberFound) {
    throw new NotFoundError("Membre introuvable");
  }

  const isPasswordValid = await comparePassword(password, memberFound.password);

  if (!isPasswordValid) {
    throw new BadRequestError("Mot de passe incorrect");
  }

  return memberFound;
};
