const express = require('express');
const userRouter = require('./users');
const movieRouter = require('./movies');

const { logoutUser } = require('../controllers/users');

const NotFoundError = require('../utils/repsone-errors/NotFoundError');

const router = express.Router();

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/signout', logoutUser);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
