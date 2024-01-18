const SubQuestion = require("../models/subQuestion");

// Create a new sub-question
const createSubQuestion = async (req, res) => {
  try {
    const { text, correct, questionId } = req.body;
    const newSubQuestion = new SubQuestion({
      text,
      correct,
      question: questionId,
    });
    const savedSubQuestion = await newSubQuestion.save();
    res.status(201).json(savedSubQuestion);
  } catch (error) {
    console.error("Error creating sub-question", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get all sub-questions
const getAllSubQuestions = async (req, res) => {
  try {
    const subQuestions = await SubQuestion.find();
    res.json(subQuestions);
  } catch (error) {
    console.error("Error fetching sub-questions", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get sub-question by ID
const getSubQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const subQuestion = await SubQuestion.findById(id);
    if (!subQuestion) {
      return res.status(404).send("Sub-question not found");
    }
    res.json(subQuestion);
  } catch (error) {
    console.error("Error fetching sub-question", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update sub-question by ID
const updateSubQuestion = async (req, res) => {
  const { id } = req.params;
  const { text, correct } = req.body;
  try {
    const updatedSubQuestion = await SubQuestion.findByIdAndUpdate(
      id,
      { text, correct },
      { new: true },
    );
    if (!updatedSubQuestion) {
      return res.status(404).send("Sub-question not found");
    }
    res.json(updatedSubQuestion);
  } catch (error) {
    console.error("Error updating sub-question", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete sub-question by ID
const deleteSubQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSubQuestion = await SubQuestion.findByIdAndRemove(id);
    if (!deletedSubQuestion) {
      return res.status(404).send("Sub-question not found");
    }
    res.json(deletedSubQuestion);
  } catch (error) {
    console.error("Error deleting sub-question", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createSubQuestion,
  getAllSubQuestions,
  getSubQuestionById,
  updateSubQuestion,
  deleteSubQuestion,
};
