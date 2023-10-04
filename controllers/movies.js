const movieSchema = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

function getMovies(req, res, next) {
  return movieSchema
    .find({})
    .then((r) => res.status(200).send(r))
    .catch(next)
}

function createMovie(req, res, next) {
  const owner = req.user.id

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body

  return cardSchema
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    })
    .then((r) => res.status(201).send(r))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'))
      } else {
        next(err)
      }
    })
}

function deleteMovie(req, res, next) {
  const owner = req.user.id
  const movie = req.params.movieId

  return cardSchema.findByIdAndDelete(movie).then((r) => {
    if (!r) {
      throw new NotFoundError('Фильм не найден')
    }

    if (r.owner.toString() !== owner) {
      throw new ForbiddenError('Нельзя удалить чужой фильм')
    } else {
      return res.status(200).send(r)
    }
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверный id'))
    } else {
      next(err)
    }
  })
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
}
