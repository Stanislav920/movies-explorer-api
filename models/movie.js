const mongoose = require('mongoose');

const { regular } = require('../utils/validation');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },

  director: {
    type: String,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  year: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (correct) => regular.test(correct),
      message: 'Ошибка валидации постера фильма',
    }
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (correct) => regular.test(correct),
      message: 'Ошибка валидации трейлера фильма',
    }
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (correct) => regular.test(correct),
      message: 'Ошибка валидации миниатюрного постера фильма',
    }
  },

  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  movieId: {
    type: Number,
    required: true
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('movie', movieSchema);
