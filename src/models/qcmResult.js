const mongoose = require("mongoose");

const qcmResultSchema = new mongoose.Schema({
  qcm: {
    type: Number,
    ref: "Qcm",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  score: Number,
});

const QcmResult = mongoose.model("QcmResult", qcmResultSchema);

module.exports = QcmResult;
