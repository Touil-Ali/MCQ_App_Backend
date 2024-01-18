const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");
const config = require("../config");

// Create a new teacher
const createTeacher = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newTeacher = new Teacher({ username, password });
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error("Error creating teacher", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    console.error("Error fetching teachers", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get teacher by ID
const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }
    res.json(teacher);
  } catch (error) {
    console.error("Error fetching teacher", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update teacher by ID
const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { username, password },
      { new: true },
    );
    if (!updatedTeacher) {
      return res.status(404).send("Teacher not found");
    }
    res.json(updatedTeacher);
  } catch (error) {
    console.error("Error updating teacher", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete teacher by ID
const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await Teacher.findByIdAndRemove(id);
    if (!deletedTeacher) {
      return res.status(404).send("Teacher not found");
    }
    res.json(deletedTeacher);
  } catch (error) {
    console.error("Error deleting teacher", error);
    res.status(500).send("Internal Server Error");
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const teacher = await Teacher.findOne({ username, password });

    if (teacher) {
      // You might want to generate and send a token for authentication
      const token = jwt.sign(
        { teacherId: teacher._id, username: teacher.username },
        config.secretKey,
        { expiresIn: config.jwtExpirationMs },
      );
      res.status(200).json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  login,
};
