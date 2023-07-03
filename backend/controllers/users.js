const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../meddlwares/errors/NotFoundError');
const InternalServerError = require('../meddlwares/errors/InternalServerError');
const BadRequestError = require('../meddlwares/errors/BadRequestError');
const ConflictError = require('../meddlwares/errors/ConflictError');
const AuthError = require('../meddlwares/errors/AuthError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const getUsersById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new Error('User not found'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'User not found') {
        next(new NotFoundError('Пользователь не найден'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalServerError('Внутрення серверная ошибка'));
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(String(password), 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(201).send({ data: user.toJSON() }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
          } else if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
          } else {
            next(new InternalServerError('Внутрення серверная ошибка'));
          }
        });
    });
};

const upDateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new Error('User not found'))
    .then((userInfo) => {
      res.status(200).send(userInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении'));
      } else if (err.message === 'User not found') {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(new InternalServerError('Внутрення серверная ошибка'));
      }
    });
};

const upDateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new Error('User not found'))
    .then((userInfo) => {
      res.status(200).send(userInfo);
    })
    .catch((err) => {
      if (err.message === 'User not found') {
        next(new AuthError('Ошибка авторизации'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обнолвнии'));
      } else {
        next(new InternalServerError('Внутрення серверная ошибка'));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(new Error('User not found'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, 'SECRET');

            res.cookie('jwt', jwt, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: true,
            });
            res.send({ data: user.toJSON() });
          } else {
            next(new AuthError('Ошибка авторизации'));
          }
        });
    })
    .catch((err) => {
      if (err.message === 'User not found') {
        next(new AuthError('Ошибка авторизации'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(new InternalServerError('Внутрення серверная ошибка'));
    });
};

const getLogout = (req, res) => {
  res.clearCookie('token').send({ message: 'Выход' });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  upDateUser,
  upDateUserAvatar,
  login,
  getUserInfo,
  getLogout,
};
