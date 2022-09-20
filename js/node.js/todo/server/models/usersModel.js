const db = require('../db/config_pg');

class Users {
    constructor(task, pass) {
        this.name = task;
        this.pass = pass;
    }

    addNew() {
        let sql = `INSERT INTO USERS
            (
            name,
            pass
            )
            VALUES
            (
            '${this.name}',
            '${this.pass}'
            ) RETURNING *`;
        return db.query(sql);
    }

    static findAll() {
        let sql = `SELECT * FROM USERS ORDER BY id`;
        return db.query(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM USERS WHERE id = $1`;
        return db.query(sql, [id]); // to protect from SQL INJECTIONS
    }

    static findByName(name) {
        let sql = `SELECT * FROM USERS WHERE name = $1`;
        return db.query(sql, [name]); // to protect from SQL INJECTIONS
    }
}

module.exports = Users;
