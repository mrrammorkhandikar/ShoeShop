import { Router } from "express";
import authRoutes from "../modules/auth/routes/index.js";
import shopRoutes from "../modules/shop/routes/index.js";
import userRoutes from "../modules/user/routes/index.js";
import adminRoutes from "../modules/admin/routes/index.js";

const router = Router();

// Public & Auth routes
router.use("/auth", authRoutes);

// Shop routes (public)
router.use("/shop", shopRoutes);

// User routes (authenticated)
router.use("/user", userRoutes);

// Admin routes (admin only)
router.use("/admin", adminRoutes);

// Keep backward compatibility for cart and orders at top level
router.use("/cart", userRoutes);
router.use("/orders", userRoutes);

// Keep shop routes at top level for backward compatibility
router.use("/products", shopRoutes);
router.use("/categories", shopRoutes);
router.use("/users", adminRoutes);

export default router;
