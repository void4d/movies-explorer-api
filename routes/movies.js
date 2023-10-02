const router = require('express').Router();
const { getMovies,
  createMovie,
  deleteMovie } = require('../controllers/movies');

router.get('/movies');
router.post('/movies');
router.delete('/movies/_id');

module.exports = router;