const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorHandler = require('./meddlwares/error-handler');
const { errorLogger, requestLogger } = require('./meddlwares/logger');

const allowedCors = [
  'https://mestohostfront.nomoreparties.sbs',
  'http://mestohostfront.nomoreparties.sbs',
  'localhost:3000',
];

const app = express();

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
});

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);
app.use(requestLogger);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(3000);
