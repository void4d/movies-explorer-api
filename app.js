const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config;
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger')

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb'} = process.env;

const app = express();

app.use(express.json());

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(userRouter);
app.use(movieRouter);

app.use(errorLogger);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
})

app.listen(PORT);