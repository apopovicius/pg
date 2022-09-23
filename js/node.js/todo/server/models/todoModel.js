const db = require('../db/config_pg');

class Todo {
    constructor(task, user_id) {
        this.task = task;
        this.user_id = user_id;
    }

    addNew() {
        let sql = `INSERT INTO TODOS
            (
            task,
            user_id
            )
            VALUES
            (
            '${this.task}',
            '${this.user_id}'
            )`;
        return db.query(sql);
    }

    static remove(id) {
        let sql = `DELETE FROM TODOS WHERE id = $1`;
        return db.query(sql, [id]);
    }

    static update(done, id) {
        let sql = 'UPDATE TODOS SET DONE = $1 WHERE id = $2';
        return db.query(sql, [done, id]);
    }

    static findAll() {
        let sql = `SELECT * FROM TODOS ORDER BY done, id, created_on`;
        return db.query(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM TODOS WHERE id = $1`;
        return db.query(sql, [id]); // to protect from SQL INJECTIONS
    }

    static findAllDone() {
        let sql = `SELECT * FROM TODOS WHERE done = $1`;
        return db.query(sql, [true]);
    }

    static findAllNotDone() {
        let sql = `SELECT * FROM TODOS WHERE done = $1`;
        return db.query(sql, [false]);
    }

    static findByUserId(user_id) {
        let sql = `SELECT * FROM TODOS WHERE user_id = $1`;
        return db.query(sql, [user_id]); // to protect from SQL INJECTIONS
    }
}

module.exports = Todo;
