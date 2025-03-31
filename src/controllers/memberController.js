import * as memberService from "../services/memberService.js";
import { generateToken } from "../utils/passwordUtils.js";
import { handleRequest } from "../utils/utils.js";

export const getMemberByEmail = handleRequest(async (req) => {
  const memberFound = await memberService.getMemberByEmail(req.body);
  return { message: "Membre trouvé:", data: memberFound };
});

export const createMember = handleRequest(async (req) => {
  const memberCreated = await memberService.createMember(req.body);
  return { message: "Membre créé:", data: memberCreated };
});

export const loginMember = handleRequest(async (req) => {
  const memberFound = await memberService.loginMember(req.body);

  const token = generateToken({ id: memberFound.member_id, email: memberFound.email });

  return {
    statusCode: 200,
    message: "Connexion réussie.",
    token,
  };
});
