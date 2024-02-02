function sendDevError(err, res) {
  console.log("hello sir");
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

console.log(process.env.NODE_ENV);
module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendProdError(err, res);
  }
  // err.statusCode = err.statusCode || 500;
  // err.status = err.status || "error";
  // err.message = err.message || "An error occured";
  // res.status(err.status).json({
  //   status: err.status,
  //   message: err.message,
  // });
};
