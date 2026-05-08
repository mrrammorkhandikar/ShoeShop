import { Router } from "express";
import { getUsers, deleteUser } from "../../../controllers/user.controller.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getUsers));
router.delete("/:id", asyncHandler(deleteUser));

export default router;
