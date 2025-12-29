import { Request, Response } from "express";

import { getAllProducts, getProductById, createProduct } from "./product.service";

export const listProducts = async (_: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.json({
            data: products
        });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    };
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const product = await getProductById(id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json({
            data: product
        });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    };
};

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, image } = req.body;
        const product = await createProduct({ name, description, price, stock, image });
        res.status(201).json(product);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    };
};