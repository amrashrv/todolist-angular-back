const {Schema, model} = require('mongoose');

const User = new Schema({
  userName: String,
  email: String,
  password: String,
}, {
  versionKey: false
});

module.exports = model('users', User);