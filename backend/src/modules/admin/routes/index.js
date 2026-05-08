import { Router } from "express";
import { protect } from "../../../middleware/authMiddleware.js";
import { authorize } from "../../../middleware/roleMiddleware.js";
import productsRouter from "./products.routes.js";
import categoriesRouter from "./categories.routes.js";
import ordersRouter from "./orders.routes.js";
import usersRouter from "./users.routes.js";

const router = Router();

// Apply admin protection to all admin routes
router.use(protect, authorize("Admin"));

router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/orders", ordersRouter);
router.use("/users", usersRouter);

export default router;
