require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ValidationError, CastError } = mongoose.Error;

const User = require('../models/user');

// Константы ошибок.
const DuplikateObjectError = 11000;
const createError = 201;

// Классы ошибок.
const BadRequestsError = require('../utils/repsone-errors/BadRequestError');
const UnauthorizedError = require('../utils/repsone-errors/UnauthorizedError');
const ConflictingRequestError = require('../utils/repsone-errors/ConflictingRequestError');
const NotFoundError = require('../utils/repsone-errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

// Авторизации пользователя

module.exports.authorizeUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Имя пользователя или (-и) пароль введены неверно'));
      }
      return bcrypt.compare(password, user.password).then((correct) => {
        if (!correct) {
          return next(new UnauthorizedError('Имя пользователя или (-и) пароль введены неверно'));
        }

        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'diploma-secret', { expiresIn: '7d' });

        return res.send({ token });
      })
        .catch((error) => next(error));
    });
};

// Выхода пользователя

module.exports.logoutUser = (req, res) => {
  res.delete('jwt').send({ message: 'Выход из системы выполнен успешно' });
};

// Регистрации пользователя

module.exports.registerUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, email, password: hash
    }).then((user) => res.status(createError).send({
      name: user.name, email: user.email
    }))
      .catch((err) => {
        if (err.name instanceof ValidationError) {
          next(new BadRequestsError('Переданы некорректные данные пользователя'));
        } if (err.code === DuplikateObjectError) {
          next(new ConflictingRequestError('Пользователь с указанной почтой уже есть в системе'));
        } else { next(err); }
      });
  }).catch(next);
};

// Получение ID пользователя.

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => next(new NotFoundError('Пользователь по указанному ID не найден')))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name instanceof CastError) {
        next(new BadRequestsError('Переданы некорректные данные пользователя'));
      } else { next(err); }
    });
};

// Функция обновления данных пользователя

module.exports.updateUserData = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user_id, { name, email }, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError('Пользователь по указанному ID не найден')))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name instanceof ValidationError) {
        next(new BadRequestsError('Переданы некорректные данные пользователя'));
      } else { next(err); }
    });
};
