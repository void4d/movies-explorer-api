const router = require('express').Router();
const { getUsers,
  getUserById,
  getMyProfile,
  updateUser, } = require('../controllers/users');

router.get('/users/me', getUsers);
router.patch('/users/me', updateUser);

module.exports = router;