import { User } from "../models/index.js";
import { successResponse } from "../utils/apiResponse.js";

export const getUsers = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] }, order: [["id", "DESC"]] });
  successResponse(res, "Users fetched", { users });
};

export const updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  
  const { name, email, role } = req.body;
  
  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  
  await user.save();
  
  const updatedUser = await User.findByPk(user.id, { attributes: { exclude: ["password"] } });
  successResponse(res, "User updated", { user: updatedUser });
};

export const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  await user.destroy();
  successResponse(res, "User deleted");
};
