const express = require("express");
const router = express.Router();
const gigController = require("../controllers/gig.controller");

router.post("/create", gigController.createGig);

// ✅ NEW: Get all gigs
router.get("/all", gigController.getAllGigs);

module.exports = router;