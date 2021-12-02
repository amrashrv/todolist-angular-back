const {Schema, model} =  require('mongoose');

const Task = new Schema({
  text: String,
  done: Boolean,
  userId: String
});

module.exports = model('tasks', Task);