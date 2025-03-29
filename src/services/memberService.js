import * as memberRepository from "../repositories/memberRepository.js";
import { validateMember } from "../validators/memberValidator.js";

export const createMember = async (body) => {
  const memberData = {
    ...body,
    birthdate: new Date(body.birthdate),
  };

  validateMember(memberData);

  const member = await memberRepository.createMember(memberData);
  return member;
};
