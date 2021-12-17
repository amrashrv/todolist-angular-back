const {Schema, model} = require('mongoose');

const Task = new Schema({
  text: String,
  done: Boolean,
  userId: String
}, {
  versionKey: false
});

module.exports = model('tasks', Task);