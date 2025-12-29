import { Router } from "express";

import { isAdmin } from "../middleware/admin.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { listProducts, getProduct, addProduct } from "./product.controller";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", authenticate, isAdmin, addProduct);

export default router;