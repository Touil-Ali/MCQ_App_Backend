const QcmResult = require("../models/qcmResult");

// Create a new QcmResult
const createQcmResult = async (req, res) => {
  try {
    const { qcmId, studentId, score } = req.body;
    const newQcmResult = new QcmResult({
      qcm: qcmId,
      student: studentId,
      score,
    });
    const savedQcmResult = await newQcmResult.save();
    res.status(201).json(savedQcmResult);
  } catch (error) {
    console.error("Error creating QcmResult", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get all QcmResults
const getAllQcmResults = async (req, res) => {
  try {
    const qcmResults = await QcmResult.find();
    res.json(qcmResults);
  } catch (error) {
    console.error("Error fetching QcmResults", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get QcmResult by ID
const getQcmResultById = async (req, res) => {
  const { id } = req.params;
  try {
    const qcmResult = await QcmResult.findById(id);
    if (!qcmResult) {
      return res.status(404).send("QcmResult not found");
    }
    res.json(qcmResult);
  } catch (error) {
    console.error("Error fetching QcmResult", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update QcmResult by ID
const updateQcmResult = async (req, res) => {
  const { id } = req.params;
  const { qcmId, studentId, score } = req.body;
  try {
    const updatedQcmResult = await QcmResult.findByIdAndUpdate(
      id,
      { qcm: qcmId, student: studentId, score },
      { new: true },
    );
    if (!updatedQcmResult) {
      return res.status(404).send("QcmResult not found");
    }
    res.json(updatedQcmResult);
  } catch (error) {
    console.error("Error updating QcmResult", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete QcmResult by ID
const deleteQcmResult = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQcmResult = await QcmResult.findByIdAndRemove(id);
    if (!deletedQcmResult) {
      return res.status(404).send("QcmResult not found");
    }
    res.json(deletedQcmResult);
  } catch (error) {
    console.error("Error deleting QcmResult", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createQcmResult,
  getAllQcmResults,
  getQcmResultById,
  updateQcmResult,
  deleteQcmResult,
};
