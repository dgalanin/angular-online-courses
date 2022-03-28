const express = require('express')
const app = express()
app.use(express.json());


const db = require('./mongodb');

const courseSchema = require('./models/courseSchema');
const userSchema = require('./models/userSchema')


app.route('/api/courses').get(async (req, res) => {
  const courses = await courseSchema.find({})
  res.send(courses)
})

app.route('/api/courses/:id').get(async (req, res) => {
  const id = req.params.id;
  const course = await courseSchema.findOne({_id: id})
  res.send(course)
})

app.route('/api/courses').post(async (req, res) => {
  const new_course = req.body
  await courseSchema.create(new_course)
  res.status(201).send(new_course)
})

app.route('/api/courses/:id').put(async (req, res) => {
  const id = req.params.id;
  const new_course = req.body;
  console.log(new_course)
  await courseSchema.findOneAndUpdate({_id: id}, new_course)
  res.status(201).send(new_course)
})

app.route('/api/courses/:id').delete(async (req, res) => {
  const id = req.params.id;
  await courseSchema.findByIdAndRemove({_id: id})
  res.sendStatus(204).send("Deleted")
})


app.route('/api/users').get(async (req, res) => {
  const users = await userSchema.find({})
  res.send(users)
})

app.route('/api/users/:id').get(async (req, res) => {
  const id = req.params.id;
  const user = await userSchema.findOne({_id: id})
  res.send(user)
})

app.route('/api/users').post(async (req, res) => {
  const new_user = req.body
  await userSchema.create(new_user)
  res.status(201).send(new_user)
})

app.route('/api/users/:id').put(async (req, res) => {
  const id = req.params.id;
  const new_user = req.body;
  console.log(new_user)
  await userSchema.findOneAndUpdate({_id: id}, new_user)
  res.status(201).send(new_user)
})

app.route('/api/users/:id').delete(async (req, res) => {
  const id = req.params.id;
  await userSchema.findByIdAndRemove({_id: id})
  res.sendStatus(204).send("Deleted")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log('Server started!')
})
