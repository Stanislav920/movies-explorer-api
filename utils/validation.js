const { Joi, celebrate } = require('celebrate');

const regular = /https?:\/\/(www\.)?[a-z0-9.-]{2,}\.[a-z]{2,}\/?[-._~:/?#[\]@!$&'()*+,;=]*/;

//  Валидации данных пользователя

// Валидация авторизации.
const validateUserAuthorize = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(6).max(40).email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});

// Валидация регистрации.
const validateUserRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),

  }),
});

// Валидация данных обновления пользователя.
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .required(),
    email: Joi.string().email()
      .required(),
  }),
});

// Валидация фильмов

// Валидация данных создания фильма
const validateAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string()
      .required(),
    director: Joi.string()
      .required(),
    duration: Joi.number()
      .required(),
    year: Joi.string()
      .required(),
    description: Joi.string()
      .required(),
    image: Joi.string().pattern(regular)
      .required(),
    trailerLink: Joi.string().pattern(regular)
      .required(),
    thumbnail: Joi.string().pattern(regular)
      .required(),
    movieId: Joi.number()
      .required(),
    nameRU: Joi.string()
      .required(),
    nameEN: Joi.string()
      .required(),
  }),
});

// Валидация данных получения фильма по ID.
const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24)
      .required(),
  }),
});

module.exports = {
  validateUserAuthorize,
  validateUserRegister,
  validateUserUpdate,
  validateAddMovie,
  validateMovieId,
  regular,
};
