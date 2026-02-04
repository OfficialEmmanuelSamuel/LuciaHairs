import express from "express";
import Review from "../models/Review";

const router = express.Router();

// POST - Save review
router.post("/", async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET - fetch all review
router.get("/", async(req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;