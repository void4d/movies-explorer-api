const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config
const userRouter = require('./routes/users')
const movieRouter = require('./routes/movies')
const { createUser, login } = require('./controllers/users')
const { auth } = require('./middlewares/auth')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const { handleError } = require('./middlewares/error-handler')
const { Joi, celebrate, errors } = require('celebrate')

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb', NODE_ENV } = process.env

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())
app.disable('x-powered-by')

app.use(requestLogger)

app.post(
  '/signin',
  celebrate({
    body: {
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    },
  }),
  login
)
app.post(
  '/signup',
  celebrate({
    body: {
      name: Joi.string().required().min(2).max(50),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    },
  }),
  createUser
)

app.use(auth)
app.use(userRouter)
app.use(movieRouter)

app.use(errorLogger)

app.use('*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }))

app.use(errors())

mongoose.connect(NODE_ENV !== 'production' ? 'mongodb://localhost:27017/bitfilmsdb' : DB_URL, {
  useNewUrlParser: true,
})

app.use(handleError)

app.listen(PORT)