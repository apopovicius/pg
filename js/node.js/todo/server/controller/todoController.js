const Todo = require('../models/todoModel');

exports.getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.findAll();

        // for (const todo of todos.rows) {
        //     console.log(todo);
        // }

        res.status(200).send(todos.rows);

        //res.status(200).render('dashboard', { userTodos: todos.rows });
        // res.status(200).json({
        //     'Number of todo': todos.rowCount,
        //     todos: todos.rows,
        // });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.createNewTodo = async (req, res, next) => {
    try {
        const { task, user_id } = req.body;
        let todo = new Todo(task, user_id);
        let response = await todo.addNew();
        console.log(`Inserted ${response.rowCount} rows`);
        //res.status(202).send(`${response.rowCount} rows inserted`);
        res.redirect('/todos');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const response = await Todo.findById(req.params.id);
        res.status(200).status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getTodoByUserId = async (req, res, next) => {
    try {
        const response = await Todo.findById(req.query.userId);
        res.status(200).status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.removeTodo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await Todo.remove(id);
        res.redirect('/todos');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.updateTodo = async (req, res, next) => {
    try {
        const { done, id } = req.body;
        const response = await Todo.update(done, id);
        res.redirect('/todos');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getAllTodosDone = async (req, res, next) => {
    try {
        const todos = await Todo.findAllDone();
        res.status(200).send(todos.rows);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getAllTodosNotDone = async (req, res, next) => {
    try {
        const todos = await Todo.findAllNotDone();
        res.status(200).send(todos.rows);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
