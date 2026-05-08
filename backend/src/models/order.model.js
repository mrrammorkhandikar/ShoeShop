import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: "user_id" },
    totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: "total_price" },
    status: {
      type: DataTypes.ENUM("Pending", "Processing", "Shipped", "Delivered", "Cancelled"),
      defaultValue: "Pending",
      allowNull: false
    }
  },
  { tableName: "orders", underscored: true, createdAt: "created_at", updatedAt: false }
);
