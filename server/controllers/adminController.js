import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//----Register Admin (One-time Setup) ----
export const registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    

    try {
        // Prevent duplicate usernames
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exits!" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new admin
        const admin = await Admin.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Admin created successfully ✅",
            admin: { id: admin.id, username: admin.username},
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering admin!"})
    };
};

// ----- Login Admin -----
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  console.log("🟢 Login attempt:", username, password); // 👈 log input

  try {
    const admin = await Admin.findOne({ username });
    console.log("🔍 Found admin:", admin); // 👈 check if found

    if (!admin) {
      console.log("❌ Admin not found");
      return res.status(400).json({ message: "Invalid Login Details" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("🔑 Password match:", isMatch); // 👈 check bcrypt result


    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: "Invalid Login Details" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
    console.log("✅ Login successful");
    res.json({ token });
  } catch (err) {
    console.error("💥 Server error:", err);
    res.status(500).json({ message: "Server Error ❌" });
  }
};

