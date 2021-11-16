const {Schema, model} =  require('mongoose');

const Task = new Schema({
  id: Number,
  text: String,
  done: Boolean
});

module.exports = model('tasks', Task);