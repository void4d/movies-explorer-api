const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config;

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb'} = process.env;

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
})

app.listen(PORT);