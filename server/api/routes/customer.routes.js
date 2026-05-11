const express = require("express");
const multer = require("multer");

const controller = require("../controllers/customer.controller.js");

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
router.post(
  "/register",
  upload.single("image"),
  controller.registerCustomer
);

module.exports = router;