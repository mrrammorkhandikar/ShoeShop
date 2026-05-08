import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Cart } from "../models/index.js";
import { env } from "../config/env.js";
import { successResponse } from "../utils/apiResponse.js";

const generateToken = (id, role) =>
  jwt.sign({ id, role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    const error = new Error("Email already in use");
    error.statusCode = 409;
    throw error;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role: "User" });
  await Cart.create({ userId: user.id });

  const token = generateToken(user.id, user.role);
  successResponse(res, "Signup successful", {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  }, 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user.id, user.role);
  successResponse(res, "Login successful", {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
};
