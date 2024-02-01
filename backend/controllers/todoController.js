const Todo = require("../model/todoModel");

exports.getTodos = async (req, res, next) => {
  const todos = await Todo.find();
  res.status(200).json({
    status: "success",
    result: todos.length,
    todos,
  });
};

exports.createTodo = async (req, res, next) => {
  res.status(200).json({
    message: "This route has not yet been created",
  });
};

exports.getTodo = async (req, res, next) => {
  res.status(200).json({
    message: "This route has not yet been created",
  });
};

exports.updateTodo = async (req, res, next) => {
  res.status(200).json({
    message: "This route has not yet been created",
  });
};

exports.deleteTodo = async (req, res, next) => {
  res.status(200).json({
    message: "This route has not yet been created",
  });
};
