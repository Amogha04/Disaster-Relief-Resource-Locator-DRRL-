const express = require("express");
const router = express.Router();
const ReliefCenter = require("../models/ReliefCenter");
const verifyToken = require("../middleware/auth"); // 🔒 Import middleware

// GET all centers (🟢 Public)
router.get("/", async (req, res) => {
  try {
    const centers = await ReliefCenter.find();
    res.json(centers);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// POST a new center (🔒 Protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, lat, lng, details } = req.body;
    const newCenter = new ReliefCenter({ name, lat, lng, details });
    await newCenter.save();
    res.status(201).json(newCenter);
  } catch (err) {
    res.status(400).json({ error: "Invalid Data" });
  }
});

// DELETE a center (🔒 Protected)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await ReliefCenter.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Deletion failed" });
  }
});

module.exports = router;
