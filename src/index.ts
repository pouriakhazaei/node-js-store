import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";
import cartRoutes from "./cart/cart.route";
import orderRoutes from "./orders/order.route";
import productRoutes from "./product/product.route";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

app.get("/", (_, res) => res.send("🟢 Store API is running!"));

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));