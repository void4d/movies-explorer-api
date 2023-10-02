require('dotenv').config;
const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function getUsers(req, res) {
  return userSchema
  .find()
  .then((r) => res.status(200).send(r))
}

function getUserById(req, res) {
  const { userId } = req.params;

  return userSchema
  .findById(userId)
  .then((r) => {
    res.status(200).send(r)
  })
}

function getMyProfile(req, res) {
  const id = req.user.id;

  return userSchema
  .findById(id)
  .then((r) => {
    res.status(200).send(r)
  })
}

function createUser(req, res) {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (error, hash) => {
    return userSchema
    .create({ name, email, password: hash })
    .then((r) => res.status(201).send({ name, email}))
  })
}

function updateUser(req, res) {
  const { name, email } = req.body;

  return userSchema
  .findByIdAndUpdate(req.user.id, { name, email }, { new: 'true'})
  .then(() => res.status(200).send({ name, email }))
}

module.exports = {
  getUsers,
  getUserById,
  getMyProfile,
  createUser,
  updateUser,
}