import { Request, Response } from "express";
import { getCartItems, addToCart, removeFromCart } from "./cart.service";

export const getCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const items = await getCartItems(userId);
        res.json(items);
    } catch (err: any) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    };
};

export const addItemToCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { productId, quantity } = req.body;

        const item = await addToCart(userId, productId, quantity || 1);
        res.status(201).json(item);
    } catch (err: any) {
        res.status(400).json({ error: err.message || "Could not add to cart" });
    };
};

export const removeItemFromCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const productId = parseInt(req.params.productId);

        const item = await removeFromCart(userId, productId);
        res.json({ message: "Removed from cart", item });
    } catch (err: any) {
        res.status(400).json({ error: err.message || "Could not remove item" });
    };
};