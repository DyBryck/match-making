import { NotFoundError } from "../errors/customErrors.js";
import * as authService from "../services/authService.js";
import { handleRequest } from "../utils/utils.js";

export const login = handleRequest(async (req, res) => {
  const { accessToken, refreshToken, member } = await authService.login(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { message: "Connexion réussie", accessToken, refreshToken, member };
});

export const refreshTokens = handleRequest(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new NotFoundError("Refresh token introuvable");

  const { accessToken, refreshToken: newRefreshToken } = await authService.refreshTokens(token);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { message: "Tokens rafraîchis:", accessToken, newRefreshToken };
});

export const logout = handleRequest(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return { message: "Déconnexion réussie" };
});
