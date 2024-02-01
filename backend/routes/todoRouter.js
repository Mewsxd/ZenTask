const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.route("/").get(todoController.getTodos).post(todoController.createTodo);

router
  .route("/:todoId")
  .delete(todoController.deleteTodo)
  .patch(todoController.updateTodo)
  .get(todoController.getTodo);

module.exports = router;
