import Product from "../models/productModels.js";
import multer from "multer";

//Image upload config
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
export const upload = multer({ storage });

//CRUD Operations
export const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, isHot } = req.body;
        const product = new Product ({
            name,
            price,
            description,
            category,
            isHot,
            image: req.file?.path,
        });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: "Error adding product" });
    };
};

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products)
};

export const deleteProducts = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
};

export const updateProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not Found"});

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
};