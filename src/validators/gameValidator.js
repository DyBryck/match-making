import { validateName, validateDescription } from "./commonValidators.js";

export const validateGame = (game, partial = false) => {
  const errors = [];

  const allowedKeys = ["name", "published_date", "link", "description"];
  const requiredKeys = partial ? [] : ["name", "link"];

  Object.keys(game).forEach((key) => {
    if (!allowedKeys.includes(key)) {
      errors.push(`Clé non autorisée: ${key}`);
    }
  });

  requiredKeys.forEach((key) => {
    if (game[key] === undefined || game[key] === null) {
      errors.push(`Clé manquante: ${key}`);
    }
  });

  if (game.name !== undefined) {
    const nameErrors = validateName(game.name);
    if (nameErrors.length > 0) {
      errors.push(`${nameErrors.join(", ")}`);
    }
  }

  if (game.description !== undefined) {
    const descErrors = validateDescription(game.description);
    if (descErrors.length > 0) {
      errors.push(`${descErrors.join(", ")}`);
    }
  }

  return errors;
};
