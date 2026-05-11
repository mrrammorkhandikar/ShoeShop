import { Router } from "express";
import { getUsers, updateUser, deleteUser } from "../../../controllers/user.controller.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getUsers));
router.put("/:id", asyncHandler(updateUser));
router.delete("/:id", asyncHandler(deleteUser));

export default router;
