import { Request, Response } from "express";

import { createOrderFromCart, getUserOrders, payOrderById } from "./order.service";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const order = await createOrderFromCart(userId);
        res.status(201).json(order);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const orders = await getUserOrders(userId);
        res.json(orders);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const payOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const orderId = parseInt(req.params.id);

        const updated = await payOrderById(userId, orderId);

        res.json({ message: "پرداخت با موفقیت انجام شد", order: updated });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};