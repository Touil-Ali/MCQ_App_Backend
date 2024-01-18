const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  myClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MyClass",
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
