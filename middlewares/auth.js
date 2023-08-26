require('dotenv').config();

const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/repsone-errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Для доступа необходимо выполнить авторизацию'));
  }

  let payload;

  const userToken = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(userToken, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret');
  } catch (_) {
    return next(new UnauthorizedError('Для доступа необходимо выполнить авторизацию'));
  }

  req.user = payload;
  return next();
};
