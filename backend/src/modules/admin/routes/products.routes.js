import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct
} from "../../../controllers/product.controller.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { uploadImage } from "../../../middleware/uploadMiddleware.js";

const router = Router();

router.post("/", uploadImage, asyncHandler(createProduct));
router.put("/:id", uploadImage, asyncHandler(updateProduct));
router.delete("/:id", asyncHandler(deleteProduct));

export default router;
