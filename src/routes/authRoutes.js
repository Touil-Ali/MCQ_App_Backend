// backend/src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// Routes for Authentication
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
