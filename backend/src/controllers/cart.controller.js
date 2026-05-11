import { Cart, CartItem, Product } from "../models/index.js";
import { successResponse } from "../utils/apiResponse.js";

const getOrCreateCart = async (userId) => {
  const [cart] = await Cart.findOrCreate({ where: { userId }, defaults: { userId } });
  return cart;
};

export const getCart = async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  const items = await CartItem.findAll({
    where: { cartId: cart.id },
    include: [{ model: Product }]
  });
  successResponse(res, "Cart fetched", { cartId: cart.id, items });
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findByPk(productId);
  if (!product || product.stock < quantity) {
    const error = new Error("Product unavailable or insufficient stock");
    error.statusCode = 400;
    throw error;
  }

  const cart = await getOrCreateCart(req.user.id);
  const [item] = await CartItem.findOrCreate({
    where: { cartId: cart.id, productId },
    defaults: { cartId: cart.id, productId, quantity }
  });
  if (item.quantity !== quantity) {
    item.quantity += quantity;
    await item.save();
  }
  
  // Include Product data in response
  const itemWithProduct = await CartItem.findByPk(item.id, {
    include: [{ model: Product }]
  });
  
  successResponse(res, "Product added to cart", { item: itemWithProduct });
};

export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await getOrCreateCart(req.user.id);
  const item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }
  item.quantity = quantity;
  await item.save();
  
  // Include Product data in response
  const itemWithProduct = await CartItem.findByPk(item.id, {
    include: [{ model: Product }]
  });
  
  successResponse(res, "Cart item updated", { item: itemWithProduct });
};

export const removeCartItem = async (req, res) => {
  const { productId } = req.body;
  const cart = await getOrCreateCart(req.user.id);
  const item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }
  await item.destroy();
  successResponse(res, "Cart item removed");
};

