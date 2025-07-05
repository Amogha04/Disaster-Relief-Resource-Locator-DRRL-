const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const reliefRoutes = require("./routes/reliefCenters");
app.use("/api/relief-centers", reliefRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Disaster Relief API is running ✅");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed ❌", err));
