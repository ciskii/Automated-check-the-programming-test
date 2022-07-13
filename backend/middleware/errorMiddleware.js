const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  console.log("err.message", err.message);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  logErrors,
  errorHandler,
};
