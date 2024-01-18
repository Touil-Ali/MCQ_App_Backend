const express = require("express");
const Teacher = require("../models/Teacher");
const config = require("../config");

// Register a new user
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newTeacher = new Teacher({
      username,
      password,
    });

    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).send("Internal Server Error");
  }
};
// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ username, password });

    if (teacher) {
      // You might want to generate and send a token for authentication
      const token = jwt.sign(
        { userId: user._id, username: user.username },
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
  loginUser,
  registerUser,
};
