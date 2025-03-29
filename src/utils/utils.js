import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

const defaultSuccessCodes = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 200,
};

const handleUniqueConstraint = (error) => {
  const field = error.message.match(/\(`(.+?)`\)/);
  switch (field[1]) {
    case "pseudo":
      return "Ce pseudo est déjà pris";
    case "email":
      return "Cet adresse email est déjà utilisé";
    default:
      return "Erreur de contrainte unique";
  }
};

export const handleRequest = (callback) => async (req, res) => {
  try {
    const body = req.method === "POST" || req.method === "PUT" ? req.body : null;

    const data = await callback(body, req, res);

    const code = defaultSuccessCodes[req.method] || 200;
    return res.status(code).json(data);
  } catch (error) {
    // appendLog(`Erreur rencontrée: ${error}`);

    if (error.message.includes("Unique constraint failed")) {
      const uniqueConstraintError = handleUniqueConstraint(error);
      return res.status(400).json({ error: uniqueConstraintError });
    }

    if (error.message.includes("FOREIGN KEY constraint failed")) {
      return res.status(404).json({ error: "Un élément n'existe pas" });
    }

    let statusCode;
    if (error instanceof NotFoundError) {
      statusCode = 404;
    } else if (error instanceof BadRequestError) {
      statusCode = 400;
    } else {
      statusCode = 500;
    }

    return res.status(statusCode).json({ error: error.message });
  }
};
