const Todo = require('../models/todoModels');

exports.getAllTodos = async (req, res, next) => {
    try {
        const [todos, _] = await Todo.findAll();
        console.log(todos);
        res.status(200).json({ count: todos.length, todos });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.createNewTodo = async (req, res, next) => {
    try {
        const { task, priority } = req.body;
        priorityNumber = priority.match(/\d/g);
        let todo = new Todo(task, priorityNumber);

        todo = await todo.save();
        console.log(todo);
        res.status(201).json({ message: 'Todo created' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const [todoItem, _] = await Todo.findById(req.params.id);
        console.log(todoItem);
        res.status(200).json({ todoItem });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
