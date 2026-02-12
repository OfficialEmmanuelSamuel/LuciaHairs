import express from "express";
import reviewSchema from "../models/Review.js";

const router = express.Router();

// POST - Save review
router.post("/", async (req, res) => {
    try {
        const review = await reviewSchema.create(req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET - fetch all review
router.get("/", async(req, res) => {
    try {
        const reviews = await reviews.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;