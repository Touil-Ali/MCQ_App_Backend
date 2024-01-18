const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student.controller");
const QcmResultController = require("../controllers/qcmResult.controller");

// Routes for Student
router.post("/create", StudentController.createStudent);
router.get("/:id", StudentController.getStudentById);
router.get("/all", StudentController.getAllStudents);
router.put("/:id", StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent);
router.post("/submit-qcm-result", QcmResultController.submitQcmResult);

module.exports = router;
