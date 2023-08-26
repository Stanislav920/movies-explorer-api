const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (correct) => validator.isEmail(correct),
      message: 'Почта пользователя введена неверно',
    }
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
