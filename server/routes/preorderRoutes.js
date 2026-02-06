import express from "express";
import {
  createPreorder,
  getPreorders,
  getPreorderById,
  deletePreorder,
} from "../controllers/preorderController.js";

const router = express.Router();

// Public
router.get("/", getPreorders);
router.get("/:id", getPreorderById);

// Admin
router.post("/", createPreorder);
router.delete("/:id", deletePreorder);

export default router;
