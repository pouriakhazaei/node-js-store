import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
    return await prisma.product.findMany({
        orderBy: { createdAt: "desc" }
    });
};

export const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id }
    });
};

export const createProduct = async (data: {
    name: string
    description?: string
    price: number
    stock: number
    image?: string
}) => {
    return await prisma.product.create({ data });
};