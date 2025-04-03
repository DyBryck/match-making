import { describe, expect, vi } from "vitest";
import * as memberController from "../src/controllers/memberController.js";
import * as memberRepository from "../src/repositories/memberRepository.js";
import * as memberService from "../src/services/memberService.js";
import * as passwordUtils from "../src/utils/passwordUtils.js";
import { fakeResponse } from "../src/utils/testUtils.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("createMember Controller", () => {
  it("devrait renvoyer le membre créé", async () => {
    // Simule une requête et une réponse
    const req = {
      body: {
        pseudo: "testUser",
        first_name: "Test",
        last_name: "User",
        email: "test@example.com",
        password: "123456",
        birthdate: "2000-01-01",
      },
      method: "POST",
    };
    const res = fakeResponse();

    const memberData = { id: 1, ...req.body };
    vi.spyOn(memberService, "createMember").mockResolvedValue(memberData);

    await memberController.createMember(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Membre crée avec succès:",
      member: memberData,
    });
    expect(memberService.createMember).toHaveBeenCalledWith(req.body);
  });

  it("devrait renvoyer 500 en cas d'erreur lors de la création d'un membre", async () => {
    const req = { body: { pseudo: "errorUser" } };
    const res = fakeResponse();

    const error = new Error("Erreur de création");
    vi.spyOn(memberService, "createMember").mockRejectedValue(error);

    await memberController.createMember(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur de création" });
  });
});

describe("createMember Service", () => {
  it("devrait créer un membre avec un mot de passe haché", async () => {
    const fakeBody = {
      pseudo: "testUser",
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "123456",
      birthdate: "2000-01-01",
    };

    const hashedPassword = "hashed123456";
    vi.spyOn(passwordUtils, "hashPassword").mockResolvedValue(hashedPassword);

    const fakeMember = {
      ...fakeBody,
      id: 1,
      password: hashedPassword,
      birthdate: new Date(fakeBody.birthdate),
    };

    const createMemberSpy = vi
      .spyOn(memberRepository, "createMember")
      .mockResolvedValue(fakeMember);

    const result = await memberService.createMember(fakeBody);

    expect(result).toEqual(fakeMember);

    expect(createMemberSpy).toHaveBeenCalledWith({
      ...fakeBody,
      birthdate: new Date(fakeBody.birthdate),
      password: hashedPassword,
    });
  });
});
