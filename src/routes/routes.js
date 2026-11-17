const express = require("express");
const router = express.Router();
const limiter = require("../config/RateLimitConfig");
const auth = require("../config/AuthotizeRoutes");
const multer = require("multer");


router.use(limiter);

router.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

module.exports = router;