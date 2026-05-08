import { Router } from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory
} from "../../../controllers/category.controller.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

const router = Router();

router.post("/", asyncHandler(createCategory));
router.put("/:id", asyncHandler(updateCategory));
router.delete("/:id", asyncHandler(deleteCategory));

export default router;
