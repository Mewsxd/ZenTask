const User = require("../models/user");

exports.createUser = async (req, res) => {
  const todoData = req.body;
  const newTodo = await Todo.create(todoData);

  // Response route not yet created
  res.status(201).json({ success: true, data: newTodo });
};

exports.getUsers = async (req, res, next) => {
  res.status(200).json({
    message: "this path has not yet been created",
  });
};
