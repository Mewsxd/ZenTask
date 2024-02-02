const User = require("../model/userModel");
const cathcAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const getJwt = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.signup = cathcAsync(async (req, res, next) => {
  const user = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });
  const token = getJwt(user._id);
  res.status(201).json({
    status: "success",
    user,
    token,
  });
});

exports.login = cathcAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new AppError("Please input email and password", 400));
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  console.log(user);
  if (!user || !(await user.comparePassword(req.body.password))) {
    return next(new AppError("Invalid password or email", 404));
  }
  user.password = undefined;
  const token = getJwt(user._id);
  res.status(200).json({
    status: "success",
    user,
    token,
  });
});
