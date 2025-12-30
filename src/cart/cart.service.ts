import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCartItems = (userId: number) => {
    return prisma.cartItem.findMany({
        where: { userId },
        include: { product: true }
    });
};

export const addToCart = async (userId: number, productId: number, quantity: number) => {
    const existing = await prisma.cartItem.findUnique({
        where: {
            userId_productId: {
                userId,
                productId
            }
        }
    });

    if (existing) {
        return prisma.cartItem.update({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            },
            data: {
                quantity: existing.quantity + quantity
            }
        });
    };

    return prisma.cartItem.create({
        data: {
            userId,
            productId,
            quantity
        }
    });
};

export const removeFromCart = (userId: number, productId: number) => {
    return prisma.cartItem.delete({
        where: {
            userId_productId: {
                userId,
                productId
            }
        }
    });
};