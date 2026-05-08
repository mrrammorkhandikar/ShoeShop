import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Cart = sequelize.define(
  "Cart",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: "user_id" }
  },
  { tableName: "carts", underscored: true }
);
