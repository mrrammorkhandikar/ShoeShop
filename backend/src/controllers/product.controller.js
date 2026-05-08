import { Op } from "sequelize";
import { Product, Category } from "../models/index.js";
import { successResponse } from "../utils/apiResponse.js";
import { uploadBufferToS3 } from "../utils/s3.js";

export const getProducts = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    category,
    minPrice,
    maxPrice,
    sort = "createdAt_desc"
  } = req.query;

  const where = {};
  if (search) where.name = { [Op.iLike]: `%${search}%` };
  if (category) where.categoryId = category;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price[Op.gte] = Number(minPrice);
    if (maxPrice) where.price[Op.lte] = Number(maxPrice);
  }

  const orderMap = {
    price_asc: [["price", "ASC"]],
    price_desc: [["price", "DESC"]],
    popularity_desc: [["popularity", "DESC"]],
    createdAt_desc: [["created_at", "DESC"]]
  };

  const offset = (Number(page) - 1) * Number(limit);
  const { rows, count } = await Product.findAndCountAll({
    where,
    include: [{ model: Category }],
    order: orderMap[sort] || orderMap.createdAt_desc,
    offset,
    limit: Number(limit)
  });

  successResponse(res, "Products fetched", {
    products: rows,
    pagination: {
      total: count,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(count / Number(limit))
    }
  });
};

export const getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id, { include: [{ model: Category }] });
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  successResponse(res, "Product fetched", { product });
};

export const createProduct = async (req, res) => {
  const payload = { ...req.body };
  if (req.file?.buffer) {
    const uploaded = await uploadBufferToS3({
      buffer: req.file.buffer,
      contentType: req.file.mimetype,
      originalName: req.file.originalname
    });
    payload.imageUrl = uploaded.url;
  }
  const product = await Product.create(payload);
  successResponse(res, "Product created", { product }, 201);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  const payload = { ...req.body };
  if (req.file?.buffer) {
    const uploaded = await uploadBufferToS3({
      buffer: req.file.buffer,
      contentType: req.file.mimetype,
      originalName: req.file.originalname
    });
    payload.imageUrl = uploaded.url;
  }
  await product.update(payload);
  successResponse(res, "Product updated", { product });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  await product.destroy();
  successResponse(res, "Product deleted");
};
