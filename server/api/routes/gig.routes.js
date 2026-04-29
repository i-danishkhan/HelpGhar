const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const gigController = require("../controllers/gig.controller");

// ✅ Multer config — saves images to /uploads/gigs/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/gigs/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase());
    ok ? cb(null, true) : cb(new Error("Only images allowed"));
  },
});

// POST /api/gigs/create  — multipart/form-data with optional "image" field
router.post("/create", upload.single("image"), gigController.createGig);

// GET /api/gigs/all
router.get("/all", gigController.getAllGigs);

module.exports = router;