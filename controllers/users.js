require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-err');

const { JWT_KEY = 'secret' } = process.env;

function getUsers(req, res, next) {
  return userSchema
    .find({})
    .then((r) => res.status(200).send(r))
    .catch(next);
}

function getUserById(req, res, next) {
  const { userId } = req.params;

  return userSchema
    .findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь с таким ID не найден');
    })
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный ID'));
      } else {
        next(err);
      }
    });
}

function getMyProfile(req, res, next) {
  const { id } = req.user;

  return userSchema
    .findById(id)
    .then((r) => {
      if (!r) {
        throw new NotFoundError('Пользователь с таким ID не найден');
      }
      res.status(200).send(r);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный ID'));
      } else {
        next(err);
      }
    });
}

function createUser(req, res, next) {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (error, hash) => userSchema
    .create({ name, email, password: hash })
    .then(() => res.status(201).send({ name, email }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Email уже используется'));
      } else {
        next(err);
      }
    }));
}

function updateUser(req, res, next) {
  const { name, email } = req.body;

  return userSchema
    .findByIdAndUpdate(req.user.id, { name, email }, { new: 'true', runValidators: 'true' })
    .then(() => res.status(200).send({ name, email }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Email уже используется'));
      } else {
        next(err);
      }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Почта или пароль не могут быть пустыми');
  }

  return userSchema
    .findOne({ email })
    .select('+password')
    .then((r) => {
      if (!r) {
        throw new UnauthorizedError('Такого пользователя не существует');
      }

      bcrypt.compare(password, r.password, (error, isValid) => {
        if (!isValid) {
          throw new UnauthorizedError('Неверная почта или пароль');
        }

        const token = jwt.sign({ id: r.id }, JWT_KEY, { expiresIn: '7d' });

        return res.status(200).send({ token });
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getUsers,
  getUserById,
  getMyProfile,
  createUser,
  updateUser,
  login,
};
