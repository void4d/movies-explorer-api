const router = require('express').Router();
const { getMovies,
  createMovie,
  deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:id', deleteMovie);

module.exports = router;