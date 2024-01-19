const Qcm = require("../models/Qcm");
const Student = require("../models/Student");

// Create a new Qcm
const createQcm = async (req, res) => {
  try {
    const { _id, title, startTime, endTime, myClassId } = req.body;
    console.log("id", _id);
    console.log("myClass id", myClassId);
    if (!_id || !title || !startTime || !endTime || !myClassId) {
      console.log("error Creating qcm , one of fields is missing");
      return;
    }
    const newQcm = new Qcm({
      _id,
      title,
      startTime,
      endTime,
      myClass: myClassId,
    });
    console.log("qcm", newQcm);
    const savedQcm = await newQcm.save();
    res.status(201).json(savedQcm);
  } catch (error) {
    console.error("Error creating Qcm", error);
    res.status(500).send("Internal Server Error");
  }
};
// fetch by Student import
const fetchQcmsbyStudentId = async (req, res) => {
  const studentId = req.params.studentId;
  console.log(studentId);
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const qcms = await Qcm.find({
      myClass: student.myClass,
    });
    res.json(qcms);
  } catch (error) {
    console.error("Error Fetching qcms by Student id", error);
    res.status(500).send("Internal Server Error");
  }
};

// get Active Qcms
const getActiveQcms = async (req, res) => {
  try {
    const activeQcms = await Qcm.find({
      startTime: { $lt: new Date() },
      endTime: { $gt: new Date() },
    });
    res.json(activeQcms);
  } catch (error) {
    console.error("Error fetching active Qcms", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get all Qcms
const getAllQcms = async (req, res) => {
  try {
    const qcms = await Qcm.find();
    res.json(qcms);
  } catch (error) {
    console.error("Error fetching Qcms", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Qcm by ID
const getQcmById = async (req, res) => {
  const { id } = req.params;
  try {
    const qcm = await Qcm.findById(id);
    if (!qcm) {
      return res.status(404).send("Qcm not found");
    }
    res.json(qcm);
  } catch (error) {
    console.error("Error fetching Qcm", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Qcm by ID
const updateQcm = async (req, res) => {
  const { id } = req.params;
  const { title, startTime, endTime, myClassId } = req.body;
  try {
    const updatedQcm = await Qcm.findByIdAndUpdate(
      id,
      { title, startTime, endTime, myClass: myClassId },
      { new: true },
    );
    if (!updatedQcm) {
      return res.status(404).send("Qcm not found");
    }
    res.json(updatedQcm);
  } catch (error) {
    console.error("Error updating Qcm", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Qcm by ID
const deleteQcm = async (req, res) => {
  const { qcmId } = req.params;
  console.log(req.params);
  try {
    const deletedQcm = await Qcm.findOneAndDelete({ _id: qcmId });
    if (!deletedQcm) {
      return res.status(404).send("Qcm not found");
    }
    res.json(deletedQcm);
  } catch (error) {
    console.error("Error deleting Qcm", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createQcm,
  getAllQcms,
  getQcmById,
  updateQcm,
  deleteQcm,
  getActiveQcms,
  fetchQcmsbyStudentId,
};
