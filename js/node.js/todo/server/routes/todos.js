const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');

// API ROUTES -> /api/todos
router.route('/active').get(todoController.getAllTodosNotDone);
router.route('/completed').get(todoController.getAllTodosDone);

router
    .route('/')
    .get(todoController.getAllTodos)
    .post(todoController.createNewTodo)
    .put(todoController.updateTodo);

router
    .route('/:id')
    .get(todoController.getTodoById)
    .delete(todoController.removeTodo);

module.exports = router;
