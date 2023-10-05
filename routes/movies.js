const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const imageRegExp = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)\.(jpg|jpeg|png|gif|bmp)$/;
const videoRegExp = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: {
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().regex(/^\d{4}$/).max(new Date().getFullYear()),
    description: Joi.string().required(),
    image: Joi.string().required().regex(imageRegExp),
    trailerLink: Joi.string().required().regex(videoRegExp),
    thumbnail: Joi.string().required().regex(imageRegExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  },
}), createMovie);
router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
