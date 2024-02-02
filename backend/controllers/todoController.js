const Todo = require("../model/todoModel");
const AppError = require("../utils/appError");
const cathcAsync = require("../utils/catchAsync");

exports.getTodos = cathcAsync(async (req, res, next) => {
  const todos = await Todo.find();
  res.status(200).json({
    status: "success",
    result: todos.length,
    todos,
  });
});

exports.createTodo = cathcAsync(async (req, res, next) => {
  // if (!req.body.title) {
  //   return next(new AppError("Please give todo a title", 400));
  // }
  if (!req.body.title) {
    return next(new AppError("Todo must have a title", 400));
  }
  const todo = await Todo.create(req.body);
  res.status(201).json({
    status: "success",
    todo,
  });
});

exports.getTodo = async (req, res, next) => {
  const todo = await Todo.findById(req.params.todoId);
  res.status(200).json({
    status: "success",
    todo,
  });
};

exports.updateTodo = async (req, res, next) => {
  delete req.body.createdAt;
  const todo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    todo: todo,
  });
};

exports.deleteTodo = async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.todoId);
  res.status(204).json({
    status: "success",
    message: "Todo deleted",
  });
};
