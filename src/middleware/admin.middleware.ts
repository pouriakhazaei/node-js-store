import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).userId;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    };

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true }
    });

    if (!user || user.role !== "ADMIN") {
        return res.status(403).json({ error: "Access denied" });
    };

    next();
};