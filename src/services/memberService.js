import { BadRequestError } from "../errors/customErrors.js";
import * as memberRepository from "../repositories/memberRepository.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { validateAndThrow } from "../utils/validatorUtils.js";
import { validateMember } from "../validators/memberValidator.js";

export const getMemberById = async (body) => {
  const { id } = body;
  return await memberRepository.getMemberById(parseInt(id));
};

export const getMemberByEmail = async (body) => {
  const { email } = body;
  return await memberRepository.getMemberByEmail(email);
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

  return await memberRepository.createMember(memberData);
};

export const loginMember = async (body) => {
  const { password } = body;

  const memberFound = await getMemberByEmail(body);
  await comparePassword(password, memberFound.password);

  return memberFound;
};

// Relations
export const followMember = async (body) => {
  const { followerId, followedId } = body;
  if (followedId === followerId) {
    throw new BadRequestError("Un membre ne peut pas se suivre lui-même");
  }
  return await memberRepository.followMember(followerId, followedId);
};
