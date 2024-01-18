// backend/src/routes/classRoutes.js
const express = require("express");
const router = express.Router();
const ClassController = require("../controllers/ClassController");

// Routes for classRoutes
router.post("/create", ClassController.createMyClass);
router.get("/all", ClassController.getAllMyClasses);
router.get("/:id", ClassController.getMyClassById);
router.put("/:id", ClassController.updateMyClass);
router.delete("/:id", ClassController.deleteMyClass);
module.exports = router;
