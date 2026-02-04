import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema (
    {
        username: { type: String, required: true},
        product: { type: String, required: true},
        message: { type: String, required: true},
        rating: { type: Number, min: 1, max: 5},
    },
    { timestamps: true }
);

export default reviewSchema;