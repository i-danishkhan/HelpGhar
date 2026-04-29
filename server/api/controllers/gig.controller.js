const gigModel = require("../models/gig.model");

exports.createGig = async (req, res) => {
  try {
    const { workerId, title, description, price, category } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    await gigModel.createGig({
      workerId,
      title,
      description,
      price,
      category,
    });

    res.status(201).json({ message: "Gig created successfully ✅" });
  } catch (err) {
    console.error("🔥 FULL ERROR:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// ✅ NEW: Get all gigs
exports.getAllGigs = async (req, res) => {
  try {
    const gigs = await gigModel.getAllGigs();
    res.status(200).json({ gigs });
  } catch (err) {
    console.error("🔥 ERROR (getAllGigs):", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};