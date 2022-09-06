let mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dota',
    database: 'todo',
});

function connect() {
    db.connect((err) => {
        if (err) throw err;
        console.log('mysql connected');
    });
}

function useDb(dbName) {
    let sql = `USE ${dbName}`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`${dbName} selected`);
    });
}

function createTable() {
    return new Promise((resolve, reject) => {
        useDb();
        sql =
            'CREATE TABLE IF NOT EXISTS todos(id int AUTO_INCREMENT, task VARCHAR(255), PRIMARY KEY (id))';
        db.query(sql, function (err, result) {
            if (err) reject(err);
            else {
                console.log('Table `task` created');
                resolve('Table `task` created');
            }
        });
    });
}

function obtainTaskList() {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT task FROM todos';
        db.query(sql, (err, result) => {
            if (err) reject(err);
            else {
                const tasks = result.map((todo) => todo.task);
                console.log(tasks);
                resolve(result);
            }
        });
    });
}

function addTask(todoTask) {
    return new Promise((resolve, reject) => {
        let task = { task: todoTask };
        let sql = 'INSERT INTO todos SET ?';
        db.query(sql, task, (err, result) => {
            if (err) reject(err);
            else {
                console.log(`New row inserted: ${todoTask}`);
                resolve(`New row inserted: ${todoTask}`);
            }
        });
    });
}

function deleteTask(task) {
    let sql = `DELETE FROM todos WHERE task = ${task}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        response.send(result);
    });
}

function disconnect() {
    db.end();
}

module.exports = {
    connect,
    createTable,
    obtainTaskList,
    addTask,
    deleteTask,
    disconnect,
};
