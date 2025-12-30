import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrderFromCart = async (userId: number) => {
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { product: true }
    });

    if (cartItems.length === 0) {
        throw new Error("Cart is empty");
    };

    for (const item of cartItems) {
        if (item.product.stock < item.quantity) {
            throw new Error(`محصول '${item.product.name}' فقط ${item.product.stock} عدد موجود است`);
        };
    };


    const total = cartItems.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    const order = await prisma.order.create({
        data: {
            userId,
            total,
            items: {
                create: cartItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price
                }))
            }
        },
        include: { items: true }
    });

    for (const item of cartItems) {
        await prisma.product.update({
            where: { id: item.productId },
            data: {
                stock: {
                    decrement: item.quantity
                }
            }
        });
    };

    await prisma.cartItem.deleteMany({
        where: { userId }
    });

    return order;
};

export const getUserOrders = async (userId: number) => {
    return prisma.order.findMany({
        where: { userId },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export const payOrderById = async (userId: number, orderId: number) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId }
    });

    if (!order || order.userId !== userId) {
        throw new Error("سفارش پیدا نشد یا مربوط به شما نیست");
    };

    if (order.status === "PAID") {
        throw new Error("این سفارش قبلاً پرداخت شده است");
    };

    return prisma.order.update({
        where: { id: orderId },
        data: {
            status: "PAID"
        }
    });
};