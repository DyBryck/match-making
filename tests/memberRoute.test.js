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
      message: "Membre créé:",
      data: memberData,
    });
    expect(memberService.createMember).toHaveBeenCalledWith(req.body);
  });

  it("devrait renvoyer 500 en cas d'erreur lors de la création d'un membre", async () => {
    const req = { body: { pseudo: "errorUser" } };
    const res = fakeResponse();

    vi.spyOn(memberService, "createMember").mockRejectedValue(new Error("Erreur de création"));

    await memberController.createMember(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erreur de création" });
  });
});

describe("loginMember controller", () => {
  it("devrait renvoyer connexion réussie et un token lors de la connexion", async () => {
    const req = { body: { email: "test@exemple.com", password: "123456" } };
    const res = fakeResponse();

    const fakeMember = {
      id: "user123",
      email: "test@exemple.com",
      password: "hashedPassword",
    };

    vi.spyOn(memberService, "loginMember").mockResolvedValue(fakeMember);
    vi.spyOn(passwordUtils, "generateToken").mockReturnValue("fake.jwt.token");

    await memberController.loginMember(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 200,
      message: "Connexion réussie.",
      token: "fake.jwt.token",
    });
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
