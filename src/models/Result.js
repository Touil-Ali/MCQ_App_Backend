const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  qcmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Qcm",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Result", ResultSchema);
