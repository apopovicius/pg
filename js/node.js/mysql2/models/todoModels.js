const db = require('../config/db');

class Todo {
    constructor(task, priority) {
        this.task = task;
        this.priority = priority;
    }

    save() {
        let date = new Date();
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let hh = date.getHours();
        let min = date.getMinutes();
        let seconds = date.getSeconds();

        let createdDate = `${mm}-${dd}-${yyyy} ${hh}:${min}:${seconds}`;

        let sql = `INSERT INTO TODO.TODOS
            (
            task,
            created,
            priority
            )
            VALUES
            (
            '${this.task}',
            STR_TO_DATE('${createdDate}', '%d-%m-%Y %H:%i:%s'),
            '${this.priority}'
            )`;

        return db.execute(sql);
    }

    static findAll() {
        let sql = `SELECT * FROM TODO.TODOS;`;
        return db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM TODO.TODOS WHERE id = ?`;
        return db.execute(sql, [id]); // to protect from SQL INJECTIONS
    }
}

module.exports = Todo;
