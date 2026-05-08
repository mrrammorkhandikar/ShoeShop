import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false, field: "order_id" },
    productId: { type: DataTypes.INTEGER, allowNull: false, field: "product_id" },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
  },
  { tableName: "order_items", underscored: true, timestamps: false }
);
