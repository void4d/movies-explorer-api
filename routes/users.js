const router = require('express').Router();
const { getUsers,
  getUserById,
  getMyProfile,
  updateUser, } = require('../controllers/users');

router.get('/users', getUsers)
router.get('/users/me', getMyProfile);
router.patch('/users/me', updateUser);

module.exports = router;