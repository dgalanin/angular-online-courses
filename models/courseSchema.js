const mongoose = require("mongoose");
const {Schema} = mongoose;

const lessonModel= require('./lessonModel');

const courseSchema = new Schema({
  title: String,
  description: String,
  authorName: String,
  lessons: Array(lessonModel)
});


module.exports = mongoose.model("course", courseSchema);

