import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    isHot: { type: Boolean, default: false},
}, { timestamps: true});

export default mongoose.model("Product", productSchema);
