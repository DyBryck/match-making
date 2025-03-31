import * as memberService from "../services/memberService.js";
import { handleRequest } from "../utils/utils.js";

export const getMemberByEmail = handleRequest(async (req) => {
  const memberFound = await memberService.getMemberByEmail(req.body.email);
  return { message: "Membre trouvé:", data: memberFound };
});

export const createMember = handleRequest(async (req) => {
  const memberCreated = await memberService.createMember(req.body);
  return { message: "Membre créé:", data: memberCreated };
});

// export const loginMember = handleRequest(async (req) => {
//   const { email, password } = req.body;
//   const memberFound = await getMemberByEmail(req.body);

//   if (password !== memberFound.password) {
//     return { message: "Mot de passe incorrect" };
//   }

//   return {
//     message: "Connexion réussie.",
//   };
// });
