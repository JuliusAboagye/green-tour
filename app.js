const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoutes');
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRoute);

app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({ status: 'fail', message: `Can't find ${req.originalUrl}` });
  next();
});

module.exports = app;
