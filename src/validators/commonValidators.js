export const validateEmail = (email) => {
  const errors = [];

  if (typeof email !== "string") {
    errors.push("L'email doit être une chaîne de caractères");
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
  if (typeof name !== "string") {
    return "Le nom doit être une chaîne de caractères";
  }
};

export const validateDate = (date) => {
  const errors = [];
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = date.match(dateRegex);
  if (!match) {
    errors.push("Format de date invalide, attendu YYYY-MM-DD");
  } else {
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    if (month < 1 || month > 12) {
      errors.push("Mois invalide (1–12)");
    }
    if (day < 1 || day > 31) {
      errors.push("Jour invalide (1–31)");
    }
  }
  return errors;
};
