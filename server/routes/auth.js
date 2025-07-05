const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Signup route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashed });
    await newAdmin.save();
    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    res.status(500).json({ msg: "Error during signup" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "6h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Login failed" });
  }
});

module.exports = router;
