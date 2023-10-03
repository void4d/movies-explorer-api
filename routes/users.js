const router = require('express').Router();
const { getUsers,
  getMyProfile,
  updateUser, } = require('../controllers/users');
const { Joi, celebrate } = require('celebrate');

router.get('/users', getUsers)
router.get('/users/me', getMyProfile);
router.patch('/users/me', celebrate({
  body: {
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
  }
}), updateUser);

module.exports = router;