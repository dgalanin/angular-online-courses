const mongoose = require("mongoose");
const {Schema} = mongoose;

const courseModel = require('./courseModel');

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  isTeacher: Boolean,
  currentCourses: Array(courseModel),
  achievements: Array(courseModel)
});


module.exports = mongoose.model("user", userSchema);
