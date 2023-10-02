const movieSchema = require('../models/movie');

function getMovies(req, res) {
  return movieSchema
  .find({})
  .then((r) => res.status(200).send(r))
}

function createMovie(req, res) {
  const owner = req.user.id;

  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;

  return cardSchema
  .create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner })
  .then((r) => res.status(201).send(r))
}

function deleteMovie(req, res) {
  const owner = req.user.id;
  const movie = req.params.movieId;

  return cardSchema
  .findByIdAndDelete(movie)
  .then((r) => {
    if (!r) {
      console.log('Фильм не найден')
    }

    if (r.owner.toString() !== owner) {
      console.log('Нельзя удалить чужой фильм');
    } else {
      return res.status(200).send(r);
    }
  })
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie
}