import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
const router = express.Router();

// One-time route to register admin
router.post("/register", registerAdmin);

// login route
router.post("/login", loginAdmin);

export default router;