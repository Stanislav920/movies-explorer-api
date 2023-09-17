const mongoose = require('mongoose');
// const validator = require('validator');
const { regular } = require('../utils/validation');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (correct) => regular.test(correct),
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
