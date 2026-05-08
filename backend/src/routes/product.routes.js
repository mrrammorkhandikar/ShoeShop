import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = Router();

router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getProductById));
router.post("/", protect, authorize("Admin"), uploadImage, asyncHandler(createProduct));
router.put("/:id", protect, authorize("Admin"), uploadImage, asyncHandler(updateProduct));
router.delete("/:id", protect, authorize("Admin"), asyncHandler(deleteProduct));

export default router;
