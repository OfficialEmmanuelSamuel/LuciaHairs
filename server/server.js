import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reviewsRoute from "./routes/review.js";
import offerRoutes from "./routes/offerRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import adminAnalytics from "./routes/adminAnalytics.js";
import preorderRoutes from "./routes/preorderRoutes.js";



dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewsRoute);
app.use("/api/offers", offerRoutes);
app.use("/api/admin/analytics", adminAnalytics);
app.use("/api/preorders", preorderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
