const axios = require('axios');

exports.homeRoute = (req, res) => {
    res.render('index');
};

exports.dashboardRoute = async (req, res) => {
    // Make get request to API todos
    let uri = 'http://127.0.0.1:3000/api/todos';
    todos = await axios.get(uri);
    res.render('dashboard', { userTodos: todos.data });
};

exports.dashboardDoneTodos = async (req, res) => {
    // Make get request to API todos
    todos = await axios.get('http://127.0.0.1:3000/api/todos/completed');
    res.render('dashboard', { userTodos: todos.data });
};

exports.dashboardNotDoneTodos = async (req, res) => {
    // Make get request to API todos
    todos = await axios.get('http://127.0.0.1:3000/api/todos/active');
    res.render('dashboard', { userTodos: todos.data });
};
