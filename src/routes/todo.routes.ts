const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todo.controller");

router.get("/todos", todoController.getTodos);

router.post("/todos", todoController.addTodo);

router.put("/todos/:todoId", todoController.updateTodo);

router.delete("/todos/:todoId", todoController.deleteTodo);

module.exports = router;
