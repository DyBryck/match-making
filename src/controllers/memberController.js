import * as memberService from "../services/memberService.js";
import { generateToken } from "../utils/passwordUtils.js";
import { handleRequest } from "../utils/utils.js";

export const getMemberById = handleRequest(async (req) => {
  const memberFound = await memberService.getMemberById(req.params);
  return { message: "Membre trouvé grâce à l'ID:", member: memberFound };
});

export const getMemberByEmail = handleRequest(async (req) => {
  const memberFound = await memberService.getMemberByEmail(req.body);
  return { message: "Membre trouvé grâce à l'email:", member: memberFound };
});

export const createMember = handleRequest(async (req) => {
  const memberCreated = await memberService.createMember(req.body);
  return { message: "Membre crée avec succès:", member: memberCreated };
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

export const followMember = handleRequest(async (req) => {
  const body = {
    followerId: req.body.member_id,
    followedId: parseInt(req.params.id),
  };

  const relation = await memberService.followMember(body);
  return { message: "Suivi réalisé avec succès:", relation };
});
