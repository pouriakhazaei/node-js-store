import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { getCart, addItemToCart, removeItemFromCart } from "./cart.controller";

const router = Router();

router.use(authenticate);

router.get("/", getCart);
router.post("/", addItemToCart);
router.delete("/:productId", removeItemFromCart);

export default router;