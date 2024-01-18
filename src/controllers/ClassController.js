const MyClass = require("../models/Class");

// Create a new MyClass
const createMyClass = async (req, res) => {
  try {
    const { className } = req.body;
    const newMyClass = new MyClass({ className });
    const savedMyClass = await newMyClass.save();
    res.status(201).json(savedMyClass);
  } catch (error) {
    console.error("Error creating MyClass", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get all MyClasses
const getAllMyClasses = async (req, res) => {
  try {
    const myClasses = await MyClass.find();
    res.json(myClasses);
  } catch (error) {
    console.error("Error fetching MyClasses", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get MyClass by ID
const getMyClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const myClass = await MyClass.findById(id);
    if (!myClass) {
      return res.status(404).send("MyClass not found");
    }
    res.json(myClass);
  } catch (error) {
    console.error("Error fetching MyClass", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update MyClass by ID
const updateMyClass = async (req, res) => {
  const { id } = req.params;
  const { className } = req.body;
  try {
    const updatedMyClass = await MyClass.findByIdAndUpdate(
      id,
      { className },
      { new: true },
    );
    if (!updatedMyClass) {
      return res.status(404).send("MyClass not found");
    }
    res.json(updatedMyClass);
  } catch (error) {
    console.error("Error updating MyClass", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete MyClass by ID
const deleteMyClass = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMyClass = await MyClass.findByIdAndRemove(id);
    if (!deletedMyClass) {
      return res.status(404).send("MyClass not found");
    }
    res.json(deletedMyClass);
  } catch (error) {
    console.error("Error deleting MyClass", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createMyClass,
  getAllMyClasses,
  getMyClassById,
  updateMyClass,
  deleteMyClass,
};
