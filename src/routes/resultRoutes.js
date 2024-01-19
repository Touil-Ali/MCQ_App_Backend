// backend/src/routes/resultRoutes.js
const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/qcmResultController");

// Routes for Results
router.get("/", ResultController.getAllQcmResults);
router.get("/:qcmId", ResultController.getQcmResultById);
router.post("/create", ResultController.createQcmResult);

module.exports = router;
