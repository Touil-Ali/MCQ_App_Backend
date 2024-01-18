// backend/src/routes/resultRoutes.js
const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/ResultController");

// Routes for Results
router.get("/", ResultController.getAllResults);
router.post("/create", ResultController.createResult);

module.exports = router;
