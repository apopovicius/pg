const Todo = require('../models/todoModel');

exports.getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.findAll();
        for (const todo of todos.rows) {
            console.log(todo);
        }
        res.status(200).json({
            'Number of todo': todos.rowCount,
            todos: todos.rows,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.createNewTodo = async (req, res, next) => {
    try {
        const { task, user_id } = req.body;
        let todo = new Todo(task, user_id);
        todo = await todo.addNew();
        console.log(todo);
        res.status(201).json({ message: 'Todo created' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const response = await Todo.findById(req.params.id);
        console.log(response);
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.removeTodo = async (req, res, next) => {
    try {
        const id = req.body.id;
        const response = await Todo.remove(id);
        console.log(response);
        res.status(202).json(response.rows);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.updateTodo = async (req, res, next) => {
    try {
        const { done, id } = req.body;
        const response = await Todo.update(done, id);
        console.log(response);
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
