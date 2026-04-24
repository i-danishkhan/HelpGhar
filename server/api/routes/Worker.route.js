const express = require("express");
const multer = require("multer");
const path = require("path");

const controller = require("../controllers/worker.controller.js");

const router = express.Router();

// upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// route
router.post("/register", upload.single("image"), controller.registerWorker);

module.exports = router;