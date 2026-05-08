import { errorResponse } from "../utils/apiResponse.js";
import { logger } from "../utils/logger.js";

export const notFound = (req, res) => {
  errorResponse(res, `Route not found: ${req.originalUrl}`, 404);
};

export const errorHandler = (err, req, res, next) => {
  logger.error(err);
  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";
  errorResponse(res, message, status, err.details || []);
};
