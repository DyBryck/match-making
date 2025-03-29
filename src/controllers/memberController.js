import * as memberService from "../services/memberService.js";
import { handleRequest } from "../utils/utils.js";

export const createMember = handleRequest(async (body /*, req, res */) => {
  const memberCreated = await memberService.createMember(body);
  return { message: "Membre créé", memberCreated };
});
