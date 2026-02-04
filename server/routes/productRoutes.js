import express from "express";
import { addProduct, getProducts, deleteProducts, updateProduct, upload } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, upload.single("image"), addProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProducts);

export default router;
