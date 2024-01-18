const mongoose = require("mongoose");

const myClassSchema = new mongoose.Schema({
  className: String,
});

const MyClass = mongoose.model("MyClass", myClassSchema);

module.exports = MyClass;
