const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');

// -> /todos
router
    .route('/')
    .get(todoController.getAllTodos)
    .post(todoController.createNewTodo)
    .delete(todoController.removeTodo)
    .put(todoController.updateTodo);

router.route('/:id').get(todoController.getTodoById);

module.exports = router;
