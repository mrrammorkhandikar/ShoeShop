import { Router } from "express";
import Joi from "joi";
import { signup, login } from "../../../controllers/auth.controller.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { validateRequest } from "../../../middleware/validateRequest.js";

const router = Router();

const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

router.post("/signup", validateRequest(signupSchema), asyncHandler(signup));
router.post("/login", validateRequest(loginSchema), asyncHandler(login));

export default router;
