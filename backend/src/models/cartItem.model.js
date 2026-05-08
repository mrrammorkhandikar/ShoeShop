import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const CartItem = sequelize.define(
  "CartItem",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cartId: { type: DataTypes.INTEGER, allowNull: false, field: "cart_id" },
    productId: { type: DataTypes.INTEGER, allowNull: false, field: "product_id" },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  },
  { tableName: "cart_items", underscored: true, timestamps: false }
);
