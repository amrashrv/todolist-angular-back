const {Schema, model} =  require('mongoose');

const Task = new Schema({
  text: String,
  done: Boolean
});

module.exports = model('tasks', Task);