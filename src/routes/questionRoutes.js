// backend/src/routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/QuestionController");

// Routes for Questions
router.get("/:questionId", QuestionController.getQuestionById);
router.post("/qcms/:qcmId/questions", QuestionController.createQuestion);
router.put("/:questionId", QuestionController.updateQuestion);
router.delete("/:questionId", QuestionController.deleteQuestion);
module.exports = router;
