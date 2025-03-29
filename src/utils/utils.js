import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

const defaultSuccessCodes = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 200,
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
      return res.status(400).json({ error: "Doublon détecté" });
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
