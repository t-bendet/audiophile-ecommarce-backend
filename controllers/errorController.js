const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1 /)[0];
  const message = `Duplicate filed value: ${value}, Please use another value`;
  return new AppError(message, 400);
};

const handleValidationDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, res) => {
  // * Operational, trusted error : send message to client
  const { statusCode = 500, status = 'error', message, isOperational } = err;
  if (isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });
    //*  Programming or other unknown error: don't leak error details
  } else {
    //* 1) Log error
    console.error('Error ☢️', err);
    //* 2) send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const sendErrorDev = (err, res) => {
  const { statusCode = 500, status = 'error', message } = err;
  res.status(statusCode).json({
    status,
    err,
    message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;
    if (err.name === 'CastError') {
      error = handleCastErrorDB(err);
    } else if (err.code === 11000) {
      error = handleDuplicateFieldsDB(err);
    } else if (err.name === 'ValidationError') {
      error = handleValidationDB(err);
    }
    sendErrorProd(error, res);
  }
};

//* if we pass 4 parameters express will recognize
//* this as a Error handling  middleware
