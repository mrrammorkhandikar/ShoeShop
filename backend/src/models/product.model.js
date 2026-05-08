import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "category_id"
    },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    imageUrl: { type: DataTypes.STRING, allowNull: true, field: "image_url" },
    popularity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  },
  { tableName: "products", underscored: true }
);
