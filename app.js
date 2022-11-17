const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
