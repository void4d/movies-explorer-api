const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "Имя" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "Имя" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "Имя" - 30 символов'],
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный адрес email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "Пароль" должно быть заполнено'],
    minlength: [6, 'Минимальная длина поля "Пароль" - 6 символов'],
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
