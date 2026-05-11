import { Category, Product } from "../models/index.js";
import { successResponse } from "../utils/apiResponse.js";

export const getCategories = async (req, res) => {
  const categories = await Category.findAll({ 
    order: [["id", "DESC"]]
  });
  
  // Get product count for each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const productCount = await Product.count({
        where: { categoryId: category.id }
      });
      return {
        ...category.toJSON(),
        productCount
      };
    })
  );
  
  successResponse(res, "Categories fetched", { categories: categoriesWithCount });
};

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  successResponse(res, "Category created", { category }, 201);
};

export const updateCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }
  await category.update(req.body);
  successResponse(res, "Category updated", { category });
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }
  await category.destroy();
  successResponse(res, "Category deleted");
};
