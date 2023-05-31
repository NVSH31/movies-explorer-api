require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requesLogger, errorLogger } = require('./middlewares/logger');
const { corsMW } = require('./middlewares/cors');
const { limiter } = require('./utils/rate_limit');
const { UNIQUE_FIELD, SERVER_ERROR } = require('./utils/statuses');
const router = require('./routes/index');

const app = express();

const { BASE_PATH_DEV } = require('./utils/const');

const {
  PORT = 3000, BASE_PATH, NODE_ENV = '',
} = process.env;

mongoose.connect(NODE_ENV === 'production' ? BASE_PATH : BASE_PATH_DEV);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(corsMW);

app.use(requesLogger);

app.use(limiter);
app.use(helmet());

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  let statusCode;
  let message;
  if (err.code === 11000) {
    statusCode = UNIQUE_FIELD.code;
    message = UNIQUE_FIELD.message;
  } else {
    statusCode = err.statusCode || err.code || 500;
    message = err.message;
  }
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? SERVER_ERROR.message : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
