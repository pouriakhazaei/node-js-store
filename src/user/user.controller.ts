import { Request, Response } from "express";
import { getUserProfile } from "./user.service";

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        const user = await getUserProfile(userId);

        res.status(200).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};