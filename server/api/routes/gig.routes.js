const express = require("express");
const router = express.Router();
const gigController = require("../controllers/gig.controller");

router.post("/create", gigController.createGig);

module.exports = router;