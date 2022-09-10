const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

// let sql = 'SELECT * FROM todos;';

// pool.execute(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
// });

module.exports = pool.promise();
