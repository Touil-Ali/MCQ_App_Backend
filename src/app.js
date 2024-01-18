// backend/src/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const qcmRoutes = require("./routes/qcmRoute");
const questionRoutes = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes");
const classRoutes = require("./routes/classRoute");
const teacherRoutes = require("./routes/teacherRoute");
const verifyToken = require("./middleware/middleware");
// const resultRoutes = require("./routes/resultRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(config.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for successful database connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Routes
app.use("/qcms", verifyToken, qcmRoutes);
app.use("/questions", questionRoutes);
app.use("/auth", authRoutes);
app.use("/classes", verifyToken, classRoutes);
app.use("/teachers", verifyToken, teacherRoutes);
// app.use("/results", resultRoutes);

module.exports = app;
