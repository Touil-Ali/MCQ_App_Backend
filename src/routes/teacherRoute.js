const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/TeacherController");

// Routes for Teacher
router.post("/login", TeacherController.login);
router.post("/create", TeacherController.createTeacher);
router.put("/update/:teacherId", TeacherController.updateTeacher);
router.get("/:teacherId", TeacherController.getTeacherById);

module.exports = router;
