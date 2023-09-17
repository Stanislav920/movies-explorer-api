const mongoose = require('mongoose');

const { ValidationError, CastError } = mongoose.Error;

const Movie = require('../models/movie');

const createError = 201;

// Классы ошибок.
const NotFoundError = require('../utils/repsone-errors/NotFoundError');
const BadRequestsError = require('../utils/repsone-errors/BadRequestError');
const ForbiddenError = require('../utils/repsone-errors/ForbiddenError');

// Добавления фильма

module.exports.addMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(createError).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestsError('Переданы некорректные данные карточки'));
      } else { next(err); }
    });
};

// Удаления фильма

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new NotFoundError('Фильм по указанным данным не найден на сервере')))
    .then((movieItem) => {
      if (movieItem.owner.equals(req.user._id)) {
        return Movie.findByIdAndRemove(req.params.movieId).then(() => res.send({ message: 'Выбранный фильм успешно удалён' })).catch(next);
      } return next(new ForbiddenError('Вы не являетесь автором фильма, удаление невозможно'));
    })
    .catch((error) => {
      if (error instanceof CastError) next(new BadRequestsError('Переданы некорректные данные фильма'));
      else next(error);
    });
};

// Получения списка фильмов

module.exports.getMovieList = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movieItems) => res.send(movieItems))
    .catch(next);
};
