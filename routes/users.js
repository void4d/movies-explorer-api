const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getUsers, getMyProfile, updateUser } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMyProfile);
router.patch('/users/me', celebrate({
  body: {
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
  },
}), updateUser);

module.exports = router;
