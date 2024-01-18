const mongoose = require("mongoose");

const subQuestionSchema = new mongoose.Schema({
  text: String,
  correct: Boolean,
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
});

const SubQuestion = mongoose.model("SubQuestion", subQuestionSchema);

module.exports = SubQuestion;
