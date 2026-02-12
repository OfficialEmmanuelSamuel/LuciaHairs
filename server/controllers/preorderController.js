import Preorder from "../models/preOrder.js";

// @desc    Create new preorder
// @route   POST /api/preorders
// @access  Admin
export const createPreorder = async (req, res) => {
  try {
    const { name, price, image, badge, description, deadline } = req.body;

    const preorder = await Preorder.create({
      name,
      price,
      image,
      badge,
      description,
      deadline,
    });

    res.status(201).json(preorder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all preorders
// @route   GET /api/preorders
// @access  Public
export const getPreorders = async (req, res) => {
  try {
    const preorders = await Preorder.find().sort({ createdAt: -1 });
    res.json(preorders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single preorder
// @route   GET /api/preorders/:id
// @access  Public
export const getPreorderById = async (req, res) => {
  try {
    const preorder = await Preorder.findById(req.params.id);
    if (!preorder) return res.status(404).json({ message: "Preorder not found" });
    res.json(preorder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete preorder
// @route   DELETE /api/preorders/:id
// @access  Admin
export const deletePreorder = async (req, res) => {
  try {
    const preorder = await Preorder.findById(req.params.id);
    if (!preorder) return res.status(404).json({ message: "Preorder not found" });

    await preorder.remove();
    res.json({ message: "Preorder removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get preorder stats
// @route   GET /api/admin/preorders/stats
// @access  Admin
export const getPreorderStats = async (req, res) => {
  try {
    const now = new Date();

    const total = await Preorder.countDocuments();

    const active = await Preorder.countDocuments({
      deadline: { $gte: now },
    });

    const expired = await Preorder.countDocuments({
      deadline: { $lt: now },
    });

    res.json({
      total,
      active,
      expired,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
