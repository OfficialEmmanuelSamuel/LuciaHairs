import express from "express";
import Offer from "../models/offer.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// CREATE OFFER (Admin)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const offer = await Offer.create({
      ...req.body,
      image: `/uploads/${req.file.filename}`,
    });
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ACTIVE OFFERS (Public)
router.get("/", async (_, res) => {
  const offers = await Offer.find({
    deadline: { $gt: new Date() },
    isActive: true,
  });
  res.json(offers);
});

export default router;
