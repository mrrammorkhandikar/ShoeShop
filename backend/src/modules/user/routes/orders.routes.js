import { Router } from "express";
import { placeOrder, getMyOrders } from "../../../controllers/order.controller.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = Router();

router.use(protect);
router.post("/", asyncHandler(placeOrder));
router.get("/my-orders", asyncHandler(getMyOrders));

export default router;
