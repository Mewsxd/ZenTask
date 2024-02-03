function sendDevError(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendProdError(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

function handleDuplicateFieldError(err, res) {
  console.log(err.message);
  res.status(400).json({
    status: "fail",
    message: `Duplicate field found: ${Object.keys(err.keyPattern)[0]}`,
  });
}

function handleValidatorError(err, res) {
  res.status(400).json({
    status: "fail",
    message: err.message,
  });
}

console.log(process.env.NODE_ENV);
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log("Error name: ", err.name);
  if (process.env.NODE_ENV === "development") {
    return sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    const error = Object.create(err);
    console.log(error);
    if (error.code === 11000) {
      return handleDuplicateFieldError(error, res);
    }
    if (error.name === "ValidatorError") {
      return handleValidatorError(error, res);
    }
    return sendProdError(err, res);
  }
};
