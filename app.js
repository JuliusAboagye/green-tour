const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoutes');
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRoute);

module.exports = app;
