import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

/**
 *
 * @param {*} error Erreur de contrainte unique
 * @description Gère les erreurs de contrainte unique
 * @returns {string} Message d'erreur spécifique
 */
const handleUniqueConstraint = (error) => {
  // Regex pour extraire le champ de l'erreur
  const field = error.message.match(/\(`(.+?)`\)/);
  switch (field[1]) {
    case "pseudo":
      return "Ce pseudo est déjà pris";
    case "email":
      return "Cette adresse email est déjà utilisé";
    default:
      return "Erreur de contrainte unique:", error;
  }
};

// Codes de succès par défaut pour chaque méthode HTTP
const defaultSuccessCodes = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 200,
};

/**
 *
 * @param {*} callback - Fonction du controller
 * @returns - Réponse d'erreur ou de succès avec le code approprié
 * @description - Gère les requêtes et les erreurs
 */
export const handleRequest = (callback) => async (req, res) => {
  try {
    // appendLog(`Requête ${req.method} sur ${req.url}`);

    // Appelle la fonction de callback avec les paramètres req et res
    const data = await callback(req, res);

    // Définit le code de succès par défaut en fonction de la méthode HTTP
    const code = defaultSuccessCodes[req.method] || 200;

    // Retourn la réponse avec le code de succès et les données
    return res.status(code).json(data);
  } catch (error) {
    // appendLog(`Erreur rencontrée: ${error}`);

    // Si l'erreur renvoyée par le repository est une erreur de contrainte unique,
    // retourne un message d'erreur spécifique
    if (error.message.includes("Unique constraint failed")) {
      const uniqueConstraintError = handleUniqueConstraint(error);
      return res.status(400).json({ error: uniqueConstraintError });
    }

    // Si l'erreur est une instance de BadRequestError ou NotFoundError,
    // définit le code approprié
    let statusCode;
    if (error instanceof NotFoundError) {
      statusCode = 404;
    } else if (error instanceof BadRequestError) {
      statusCode = 400;
    } else {
      statusCode = 500;
    }

    // retourne la réponse avec le code d'erreur et le message d'erreur
    return res.status(statusCode).json({ error: error.message });
  }
};
