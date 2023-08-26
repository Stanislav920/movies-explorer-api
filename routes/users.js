const userRouter = require('express').Router();

const { getUserId, updateUserData } = require('../controllers/users');
const { validateUserUpdate } = require('../utils/validation');

// Возвращает информацию о пользователе (email и имя)
userRouter.get('/me', getUserId);

// Обновляет информацию о пользователе (email и имя)
userRouter.patch('/me', validateUserUpdate, updateUserData);

module.exports = userRouter;
