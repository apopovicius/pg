const express = require('express');
const todoControllers = require('../controllers/todoControllers');
const router = express.Router();

// @route GET & POST to /todos/
router
    .route('/')
    .get(todoControllers.getAllTodos)
    .post(todoControllers.createNewTodo);

router.route('/:id').get(todoControllers.getTodoById);

module.exports = router;
