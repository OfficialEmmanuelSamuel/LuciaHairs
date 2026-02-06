import mongoose from "mongoose";

const preorderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    badge: { type: String }, // optional: "New", "Best Seller"
    description: { type: String },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

const Preorder = mongoose.model("Preorder", preorderSchema);

export default Preorder;

