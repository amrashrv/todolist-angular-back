const {Schema, model} = require('mongoose');

const User = new Schema({
  userName: String,
  email: String,
  password: String,
});

module.exports = model('users', User);