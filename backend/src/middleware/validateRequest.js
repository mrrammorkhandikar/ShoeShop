import { errorResponse } from "../utils/apiResponse.js";

export const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return errorResponse(
      res,
      "Validation failed",
      422,
      error.details.map((item) => item.message)
    );
  }
  next();
};
