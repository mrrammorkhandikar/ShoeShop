import { Router } from "express";
import cartRouter from "./cart.routes.js";
import ordersRouter from "./orders.routes.js";

const router = Router();

router.use("/cart", cartRouter);
router.use("/orders", ordersRouter);

export default router;
