// backend/src/routes/qcmRoutes.js
const express = require("express");
const router = express.Router();
const QcmController = require("../controllers/QcmController");
const QuestionController = require("../controllers/QuestionController");

// Routes for QCMs
router.get("/", QcmController.getAllQcms);
router.get("/active", QcmController.getActiveQcms);
router.post("/create", QcmController.createQcm);
router.get("/student/:studentId", QcmController.fetchQcmsbyStudentId);
router.post("/:qcmId/questions", QuestionController.createQuestionbyId);
router.get("/:qcmId/questions", QuestionController.getQuestionsByQcmId);
router.delete("/:qcmId", QcmController.deleteQcm);
router.put("/:qcmId", QcmController.updateQcm);

module.exports = router;
