const Student = require("../models/Student");

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { username, password, classId } = req.body;
    const newStudent = new Student({ username, password, myClass: classId });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Error creating student", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update student by ID
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { username, password },
      { new: true },
    );
    if (!updatedStudent) {
      return res.status(404).send("Student not found");
    }
    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete student by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).send("Student not found");
    }
    res.json(deletedStudent);
  } catch (error) {
    console.error("Error deleting student", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
