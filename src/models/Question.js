const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  qcm: {
    type: Number,
    ref: "Qcm",
  },
  subQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubQuestion",
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
