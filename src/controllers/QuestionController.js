const Question = require("../models/Question");
const Qcm = require("../models/Qcm");
const SubQuestion = require("../models/subQuestion");

// Function to get a question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (error) {
    console.error("Error fetching question by ID", error);
    res.status(500).send("Internal Server Error");
  }
};

const createQuestionbyId = async (req, res) => {
  try {
    const { qcmId } = req.params;
    console.log(req.body);
    const { text, subQuestions } = req.body;

    // Ensure the QCM exists
    const qcm = await Qcm.findOne({ _id: qcmId });
    if (!qcm) {
      return res.status(404).json({ message: "QCM not found" });
    }

    const createdQuestions = [];

    // Extract text and subQuestions from questions object

    // Validate question data
    if (!text || !subQuestions || !Array.isArray(subQuestions)) {
      return res.status(400).json({ message: "Invalid question data" });
    }

    // Iterate through subQuestions
    const createdSubQuestions = [];
    for (const subQuestionData of subQuestions) {
      const { text: subQuestionText, correct } = subQuestionData;

      // Validate subQuestion data
      if (!subQuestionText || typeof correct !== "boolean") {
        return res.status(400).json({ message: "Invalid subQuestion data" });
      }

      // Create the subQuestion
      const newSubQuestion = new SubQuestion({
        text: subQuestionText,
        correct,
      });
      await newSubQuestion.save();
      createdSubQuestions.push(newSubQuestion._id);
    }

    // Create the question and associate it with subQuestions
    const newQuestion = new Question({
      text,
      qcm: qcm._id,
      subQuestions: createdSubQuestions,
    });
    await newQuestion.save();
    createdQuestions.push(newQuestion._id);

    // Update QCM with created questions

    res
      .status(201)
      .json({ message: "Questions created successfully", createdQuestions });
  } catch (error) {
    console.error("Error creating questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getQuestionsByQcmId = async (req, res) => {
  const qcmId = req.params.qcmId;

  try {
    // Fetch questions related to the specified qcmId
    const questions = await Question.find({ qcmId: qcmId });
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions by qcmId", error);
    res.status(500).send("Internal Server Error");
  }
};

// Function to create a question for a specific QCM
const createQuestion = async (req, res) => {
  const qcmId = req.params.qcmId;

  try {
    // Check if the associated QCM exists
    const qcm = await Qcm.findById(qcmId);
    if (!qcm) {
      return res.status(404).json({ message: "QCM not found" });
    }

    // Create a new question associated with the QCM
    const newQuestion = new Question({
      text: req.body.text,
      qcm: qcmId,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating question", error);
    res.status(500).send("Internal Server Error");
  }
};

// Function to update a question by ID
const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.questionId,
      req.body,
      { new: true },
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(updatedQuestion);
  } catch (error) {
    console.error("Error updating question by ID", error);
    res.status(500).send("Internal Server Error");
  }
};

// Function to delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(
      req.params.questionId,
    );

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting question by ID", error);
    res.status(500).send("Internal Server Error");
  }
};

// Other controller functions...

module.exports = {
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByQcmId,
  createQuestionbyId,
  // Other exported functions...
};
