const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  qcmId: {
    type: Number,
    ref: "Qcm",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Result", ResultSchema);
