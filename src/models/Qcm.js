const mongoose = require("mongoose");

const qcmSchema = new mongoose.Schema(
  {
    _id: Number,
    title: String,
    startTime: Date,
    endTime: Date,
    myClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MyClass",
    },
  },
  {
    _id: false,
  },
);

const Qcm = mongoose.model("Qcm", qcmSchema);

module.exports = Qcm;
