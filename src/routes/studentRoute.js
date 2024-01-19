const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/studentControlller");

// Routes for Student
router.post("/create", StudentController.createStudent);
router.get("/all", StudentController.getAllStudents);
router.get("/:id", StudentController.getStudentById);
router.put("/:id", StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent); // router.post("/submit-qcm-result", QcmResultController.submitQcmResult); module.exports = router;

module.exports = router;
