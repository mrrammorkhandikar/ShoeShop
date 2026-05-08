import { Router } from "express";
import { getCart, addToCart, updateCartItem, removeCartItem } from "../../../controllers/cart.controller.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = Router();

router.use(protect);
router.get("/", asyncHandler(getCart));
router.post("/add", asyncHandler(addToCart));
router.put("/update", asyncHandler(updateCartItem));
router.delete("/remove", asyncHandler(removeCartItem));

export default router;
