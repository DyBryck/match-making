import { BadRequestError } from "../errors/customErrors.js";
import { validateDate, validateEmail, validateName, validatePseudo } from "./commonValidators.js";

export const validateMember = (member, partial = false) => {
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
      throw new BadRequestError(`Clé non autorisée: ${key}`);
    }
  });

  requiredKeys.forEach((key) => {
    if (member[key] === undefined || member[key] === null) {
      throw new BadRequestError(`Clé manquante: ${key}`);
    }
  });

  if (member.pseudo !== undefined) {
    const pseudoErrors = validatePseudo(member.pseudo);
    if (pseudoErrors.length > 0) {
      throw new BadRequestError(`${pseudoErrors.join(", ")}`);
    }
  }

  if (member.email !== undefined) {
    const emailErrors = validateEmail(member.email);
    if (emailErrors.length > 0) {
      throw new BadRequestError(`${emailErrors.join(", ")}`);
    }
  }

  ["first_name", "last_name"].forEach((field) => {
    if (member[field] !== undefined) {
      const error = validateName(member[field]);
      if (error) {
        throw new BadRequestError(`Erreur sur ${field}: ${error}`);
      }
    }
  });

  if (member.birthdate !== undefined) {
    const date = new Date(member.birthdate);
    const formatedDate = date.toISOString().split("T")[0];
    const dateErrors = validateDate(formatedDate);
    if (dateErrors.length > 0) {
      throw new BadRequestError(`Erreur sur birthdate: ${dateErrors.join(", ")}`);
    }
  }
};
