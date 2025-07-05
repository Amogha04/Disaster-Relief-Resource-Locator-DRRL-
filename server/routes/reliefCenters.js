const express = require("express");
const router = express.Router();
const ReliefCenter = require("../models/ReliefCenter");
const verifyToken = require("../middleware/auth"); // 🔒 Middleware to protect routes

// GET all centers (🟢 Public)
router.get("/", async (req, res) => {
  try {
    const centers = await ReliefCenter.find().lean(); // 🔍 Use lean for better performance
    res.json(centers);
  } catch (err) {
    console.error("Error fetching relief centers:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// POST a new center (🔒 Protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, lat, lng, details } = req.body;

    // ⚠️ Validate required fields
    if (!name || !lat || !lng) {
      return res.status(400).json({ error: "Name, latitude, and longitude are required." });
    }

    const newCenter = new ReliefCenter({ name, lat, lng, details });
    await newCenter.save();
    res.status(201).json(newCenter);
  } catch (err) {
    console.error("Error creating relief center:", err);
    res.status(400).json({ error: "Invalid data or server error" });
  }
});

// DELETE a center (🔒 Protected)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await ReliefCenter.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Center not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting relief center:", err);
    res.status(500).json({ error: "Deletion failed" });
  }
});

module.exports = router;
