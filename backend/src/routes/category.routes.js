import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", asyncHandler(getCategories));
router.post("/", protect, authorize("Admin"), asyncHandler(createCategory));
router.put("/:id", protect, authorize("Admin"), asyncHandler(updateCategory));
router.delete("/:id", protect, authorize("Admin"), asyncHandler(deleteCategory));

export default router;
