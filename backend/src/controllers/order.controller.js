import { sequelize, Cart, CartItem, Product, Order, OrderItem, User } from "../models/index.js";
import { successResponse } from "../utils/apiResponse.js";

export const placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ where: { userId: req.user.id } });
  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }

  const items = await CartItem.findAll({
    where: { cartId: cart.id },
    include: [{ model: Product }]
  });
  if (!items.length) {
    const error = new Error("Cart is empty");
    error.statusCode = 400;
    throw error;
  }

  const transaction = await sequelize.transaction();
  try {
    let total = 0;
    for (const item of items) {
      if (item.Product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.Product.name}`);
      }
      total += Number(item.Product.price) * item.quantity;
    }

    const order = await Order.create(
      { userId: req.user.id, totalPrice: total, status: "Pending" },
      { transaction }
    );

    for (const item of items) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.Product.price
        },
        { transaction }
      );
      await item.Product.update(
        { stock: item.Product.stock - item.quantity, popularity: item.Product.popularity + 1 },
        { transaction }
      );
    }

    await CartItem.destroy({ where: { cartId: cart.id }, transaction });
    await transaction.commit();
    successResponse(res, "Order placed successfully", { order }, 201);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.user.id },
    include: [{ model: OrderItem, include: [Product] }],
    order: [["created_at", "DESC"]]
  });
  successResponse(res, "Orders fetched", { orders });
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [{ model: User, attributes: ["id", "name", "email"] }, { model: OrderItem, include: [Product] }],
    order: [["created_at", "DESC"]]
  });
  successResponse(res, "All orders fetched", { orders });
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }
  order.status = req.body.status;
  await order.save();
  successResponse(res, "Order status updated", { order });
};
