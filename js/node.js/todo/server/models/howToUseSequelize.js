const db_seq = require('../db/config_seq');
const Users = require('./users');
const Todos = require('./todos');

// define relationship between tables
Users.hasMany(Todos);

// SAMPLE OF USE
(async () => {
    try {
        //const res = await db_seq.sync();
        const res = await db_seq.sync({ force: true }); // recreate tables
        console.log(res);

        const userCreated = await Users.create({
            name: 'admin',
            password: 'test',
            type: 'admin',
        });

        const customerId = userCreated.id;

        const createTodo1 = await Todos.create({
            task: 'This is the first task with no user FK',
        });

        const createTodo2 = await userCreated.createTodo({
            task: 'This is task with FK of user',
        });

        const createTodo3 = await userCreated.createTodo({
            task: 'This is task with done true',
            done: true,
        });

        const allTodoForUser = await Todos.findAll({ where: customerId });
        console.log(allTodoForUser);

        const allTodoNotDone = await Todos.findAll({ where: { done: false } });
        console.log('...........');
        console.log(
            allTodoNotDone.map((todo) => {
                return {
                    task: todo.dataValues.task,
                    done: todo.dataValues.done,
                };
            })
        );

        const updateTodo = await Todos.update(
            { task: 'Updated task', done: true },
            { where: { userId: null } }
        );

        const allDoneTodo = await Todos.findAll({ where: { done: true } });
        console.log('...........');
        console.log(
            allDoneTodo.map((todo) => {
                return {
                    task: todo.dataValues.task,
                    done: todo.dataValues.done,
                    userId: todo.dataValues.userId,
                };
            })
        );

        const getTodoById = await Todos.findByPk(2);
        console.log('...........');
        console.log(
            getTodoById.dataValues.task,
            getTodoById.dataValues.done,
            getTodoById.dataValues.userId
        );
    } catch (err) {
        console.log(err);
    }
})();
