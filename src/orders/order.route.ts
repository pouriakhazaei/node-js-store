import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { createOrder, getOrders, payOrder } from "./order.controller";

const router = Router();

router.use(authenticate);

router.get("/", getOrders);
router.post("/", createOrder);
router.post("/:id/pay", payOrder);

export default router;