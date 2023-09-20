require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

const centralizedHandler = require('./middlewares/centralizedHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');

const { authorizeUser, registerUser } = require('./controllers/users');
const { validateUserAuthorize, validateUserRegister } = require('./utils/validation');

const NotFoundError = require('./utils/repsone-errors/NotFoundError');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логгер
app.use(requestLogger);

// Cors
app.use(cors);

app.post('/signin', validateUserAuthorize, authorizeUser);
app.post('/signup', validateUserRegister, registerUser);

app.use(auth);

app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Порт не существует'));
});

// Ошибки логгера
app.use(errorLogger);

// Обрабочек ответа.
app.use(errors());
app.use(centralizedHandler);

app.listen(PORT, () => console.log('Сервер запущен!'));
