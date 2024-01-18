const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
