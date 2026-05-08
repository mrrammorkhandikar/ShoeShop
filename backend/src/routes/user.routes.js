import { Router } from "express";
import { getUsers, deleteUser } from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.use(protect, authorize("Admin"));
router.get("/", asyncHandler(getUsers));
router.delete("/:id", asyncHandler(deleteUser));

export default router;
