const lessonModel = require('./lessonModel');

const courseModel = {
  title: String,
  description: String,
  authorName: String,
  lessons: Array(lessonModel)
};


module.exports = courseModel;
