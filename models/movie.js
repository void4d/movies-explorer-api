const mongoose = require('mongoose');
const validator = require('validator');

const imageRegExp = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)\.(jpg|jpeg|png|gif|bmp)$/;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "Страна" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "Режиссёр" должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "Длительность" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "Год" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "Описание" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "Постер" должно быть заполнено'],
    validate: {
      validator: (v) => imageRegExp.test(v),
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "Ссылка на трейлер" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "Превью" должно быть заполнено'],
    validate: {
      validator: (v) => imageRegExp.test(v),
    },
  },
  owner: mongoose.Schema.Types.ObjectId,
  movieId: {
    type: Number,
    required: [true, 'Поле "ID фильма" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "Название на русском" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "Название на английском" должно быть заполнено'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
