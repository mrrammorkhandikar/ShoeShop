import { Router } from "express";
import { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.use(protect);
router.post("/", asyncHandler(placeOrder));
router.get("/my-orders", asyncHandler(getMyOrders));
router.get("/admin/all-orders", authorize("Admin"), asyncHandler(getAllOrders));
router.put("/status/:id", authorize("Admin"), asyncHandler(updateOrderStatus));

export default router;
