import { validateString, validateURL, validateNumericId } from "./commonValidators.js";

/**
 * Valide les données d'un post avant la création ou la mise à jour
 * @param {Object} postData - Données du post à valider
 * @returns {Object} - Résultat de la validation
 */
export const validatePost = (postData) => {
  const { title, content, media_link } = postData;
  const errors = {};

  // Validation du titre
  errors.title = validateString(title, "Le titre", { required: true, min: 3, max: 100 });

  // Validation du contenu
  errors.content = validateString(content, "Le contenu", { required: true, min: 10 });

  // Validation du lien média (optionnel)
  errors.media_link = validateURL(media_link, "Le lien média");

  // Nettoyer les erreurs nulles
  Object.keys(errors).forEach((key) => errors[key] === null && delete errors[key]);

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valide un ID de post
 * @param {string|number} post_id - Identifiant du post à valider
 * @returns {Object} - Résultat de la validation
 */
export const validatePostId = (post_id) => {
  const error = validateNumericId(post_id, "L'identifiant du post");
  return {
    isValid: error === null,
    errors: error ? { post_id: error } : {}
  };
};
