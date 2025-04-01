import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

/**
 * Hash un mot de passe en clair.
 * @param {string} plainPassword - Le mot de passe en clair.
 * @returns {Promise<string>} - Le mot de passe haché.
 */
export const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Erreur lors du hachage du mot de passe: " + error.message);
  }
};

/**
 * Vérifie qu’un mot de passe en clair correspond à un mot de passe haché.
 * @param {string} plainPassword - Le mot de passe en clair.
 * @param {string} hashedPassword - Le mot de passe haché stocké.
 * @returns {Promise<boolean>} - Résultat de la comparaison.
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error("Erreur lors de la vérification du mot de passe: " + error.message);
  }
};

const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré", error });
  }
};
