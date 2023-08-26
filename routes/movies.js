const movieRouter = require('express').Router();

const { addMovie, deleteMovie, getMovieList } = require('../controllers/movies');
const { validateAddMovie, validateMovieId } = require('../utils/validation');

// Возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/', getMovieList);

// Создаем фильмы
movieRouter.post('/', validateAddMovie, addMovie);

// Удаляет сохранённый фильм по id
movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movieRouter;
