const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');

// API ROUTES -> /api/todos
router.route('/active').get(todoController.getAllTodosNotDone);
router.route('/completed').get(todoController.getAllTodosDone);

router
    .route('/')
    .get((req, res, next) => {
        if (req.query.userId != null) {
            todoController.getTodoByUserId(req, res, next);
        } else {
            todoController.getAllTodos(req, res, next);
        }
    })
    .post(todoController.createNewTodo)
    .put(todoController.updateTodo);

router
    .route('/:id')
    .get(todoController.getTodoById)
    .delete(todoController.removeTodo);

module.exports = router;
