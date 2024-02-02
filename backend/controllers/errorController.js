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

function handleDuplicateField(err, res) {
  console.log(err.message);
  res.status(400).json({
    status: "fail",
    message: `Duplicate field found: ${Object.keys(err.keyPattern)[0]}`,
  });
}
console.log(process.env.NODE_ENV);
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    // const error = Object.create(err);
    let error = JSON.parse(JSON.stringify(err));
    console.log(error);
    // console.log(error);
    // console.log(err);
    if (error.code === 11000) {
      return handleDuplicateField(error, res);
    }
    return sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    return sendProdError(err, res);
  }
};
