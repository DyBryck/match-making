import { validateDate, validateEmail, validateName, validatePseudo } from "./commonValidators.js";

export const validateMember = (member, partial = false) => {
  const errors = [];
  // if (Object.keys(member).length === 0) {
  //   throw new BadRequestError("Aucun contenu à modifier");
  // }

  const allowedKeys = [
    "pseudo",
    "first_name",
    "last_name",
    "email",
    "birthdate",
    "bio",
    "password",
  ];
  const requiredKeys = partial
    ? []
    : ["pseudo", "first_name", "last_name", "email", "birthdate", "password"];

  Object.keys(member).forEach((key) => {
    if (!allowedKeys.includes(key)) {
      errors.push(`Clé non autorisée: ${key}`);
    }
  });

  requiredKeys.forEach((key) => {
    if (member[key] === undefined || member[key] === null) {
      errors.push(`Clé manquante: ${key}`);
    }
  });

  if (member.pseudo !== undefined) {
    const pseudoErrors = validatePseudo(member.pseudo);
    if (pseudoErrors.length > 0) {
      errors.push(`${pseudoErrors.join(", ")}`);
    }
  }

  if (member.email !== undefined) {
    const emailErrors = validateEmail(member.email);
    if (emailErrors.length > 0) {
      errors.push(`${emailErrors.join(", ")}`);
    }
  }

  ["first_name", "last_name"].forEach((field) => {
    if (member[field] !== undefined) {
      const nameErrors = validateName(member[field]);
      if (nameErrors.length > 0) {
        errors.push(`Erreur sur ${field}: ${nameErrors}`);
      }
    }
  });

  if (member.birthdate !== undefined) {
    const date = new Date(member.birthdate);
    const formatedDate = date.toISOString().split("T")[0];
    const dateErrors = validateDate(formatedDate);
    if (dateErrors.length > 0) {
      errors.push(`Erreur sur birthdate: ${dateErrors.join(", ")}`);
    }
  }

  return errors;
};
