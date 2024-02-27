const routeNotFound = (req, res, next) => {
  const error = new Error(`Route Not Found i.e. ${req.originalUrl}`);
  res.status(404);
  next(error); // pass error to the next middleware
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  //chec for Mongoose bad objectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "😙" : err.stack,
  });
};
export { routeNotFound, errorHandler };
