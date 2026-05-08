import { Router } from "express";
import { getAllOrders, updateOrderStatus } from "../../../controllers/order.controller.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getAllOrders));
router.put("/status/:id", asyncHandler(updateOrderStatus));

export default router;
