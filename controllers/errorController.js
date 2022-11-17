const sendErrorDev = (err, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (error, res) => {
  if (err.isOperational) {
    res
      .status(error.statusCode)
      .json({ status: error.status, message: error.message });
  } else {
    console.error('Error 💥', error);
    res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'error';

  if (process.env.NODE_ENV == 'development') {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV == 'production') {
    sendErrorProd(error, res);
  }
};
