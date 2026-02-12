import express from "express";
import Offer from "../models/offer.js";

const router = express.Router();

router.get("/stats", async (_, res) => {
  const total = await Offer.countDocuments();
  const active = await Offer.countDocuments({
    deadline: { $gt: new Date() },
    isActive: true,
  });
  const expired = total - active;

  res.json({ total, active, expired });
});



export default router;

