export const validateEmail = (email) => {
  const errors = [];
  if (typeof email !== "string") {
    errors.push("L'email doit être une chaîne de caractères");
    return errors;
  }
  if (email.length < 3) {
    errors.push("L'email est trop court");
  }
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regex.test(email)) {
    errors.push("L'email n'est pas valide");
  }
  return errors;
};

export const validatePseudo = (pseudo) => {
  const errors = [];
  if (typeof pseudo !== "string") {
    errors.push("Le pseudo doit être une chaîne de caractères");
    return errors;
  }
  if (pseudo.trim("") !== pseudo) {
    errors.push("Le pseudo ne doit pas commencer ou terminer par un espace");
  }
  if (/[#%^@"*:]/.test(pseudo)) {
    errors.push("Le pseudo ne doit pas contenir de caractères spéciaux");
  }
  if (pseudo.length < 2) {
    errors.push("Le pseudo est trop court");
  }
  if (pseudo.length > 25) {
    errors.push("Le pseudo est trop long");
  }
  return errors;
};

export const validateName = (name) => {
  const errors = [];
  if (typeof name !== "string") {
    errors.push("Le nom doit être une chaîne de caractères");
    return errors;
  }
  if (name && name.trim().length === 0) {
    errors.push("Le nom ne peut pas être vide");
  }
  return errors;
};

/**
 * Valide une chaîne de date au format YYYY-MM-DD
 * @param {string} date La date à valider au format YYYY-MM-DD
 * @returns {string[]} Un tableau contenant les messages d'erreur (vide si valide)
 */
export const validateDate = (date) => {
  const errors = [];

  // Vérifie que la date est une chaîne de caractères
  if (typeof date !== "string") {
    errors.push("La date doit être une chaîne de caractères");
    return errors;
  }

  // Vérifie le format YYYY-MM-DD avec regex
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    errors.push("Le format de date doit être YYYY-MM-DD");
    return errors;
  }

  // Découpe la date en année, mois et jour
  const [year, month, day] = date.split("-").map(Number);

  if (year < 1900) {
    errors.push("L'année doit être supérieure à 1900");
    return errors;
  }

  // Le Mois doit être entre 1 et 12
  if (month < 1 || month > 12) {
    errors.push("Le mois doit être compris entre 1 et 12");
  }

  // Vérifie si la date existe réellement
  // Récupère le nombre de jours dans le mois
  const maxDays = new Date(year, month, 0).getDate(); // Le paramètre 0 renvoie le dernier jour du mois précédent
  if (day < 1 || day > maxDays) {
    errors.push(`Cette date n'existe pas`);
  }

  return errors;
};
/**
 * Vérifie si une valeur est une chaîne de caractères valide
 * @param {string} value - La valeur à vérifier
 * @param {string} fieldName - Le nom du champ pour les messages d'erreur
 * @param {Object} options - Options de validation (min, max, required)
 * @returns {string|null} - Message d'erreur ou null si valide
 */
export const validateString = (value, fieldName, options = {}) => {
  if (options.required && !value) {
    return `${fieldName} est requis`;
  }
  if (value && typeof value !== "string") {
    return `${fieldName} doit être une chaîne de caractères`;
  }
  if (value && value.trim() === "") {
    return `${fieldName} ne peut pas être vide`;
  }
  if (options.min && value.length < options.min) {
    return `${fieldName} doit contenir au moins ${options.min} caractères`;
  }
  if (options.max && value.length > options.max) {
    return `${fieldName} ne peut pas dépasser ${options.max} caractères`;
  }
  return null;
};

/**
 * Vérifie si une valeur est une URL valide
 * @param {string} value - La valeur à vérifier
 * @param {string} fieldName - Le nom du champ pour les messages d'erreur
 * @returns {string|null} - Message d'erreur ou null si valide
 */
export const validateURL = (value, fieldName) => {
  if (value) {
    if (typeof value !== "string") {
      return `${fieldName} doit être une chaîne de caractères`;
    }
    try {
      new URL(value);
    } catch (error) {
      return `${fieldName} doit être une URL valide`, error;
    }
  }
  return null;
};

/**
 * Vérifie si une valeur est un identifiant numérique valide
 * @param {string|number} value - La valeur à vérifier
 * @param {string} fieldName - Le nom du champ pour les messages d'erreur
 * @returns {string|null} - Message d'erreur ou null si valide
 */
export const validateNumericId = (value, fieldName) => {
  if (!value) {
    return `${fieldName} est requis`;
  }
  if (isNaN(Number(value))) {
    return `${fieldName} doit être un nombre`;
  }
  return null;
};
