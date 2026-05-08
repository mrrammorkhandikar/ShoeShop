import { Router } from "express";
import productsRouter from "./products.routes.js";
import categoriesRouter from "./categories.routes.js";
import uploadRouter from "./upload.routes.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/upload", uploadRouter);

export default router;
