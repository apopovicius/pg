const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// (async () => {
//     const res = await pool.query('SELECT * FROM todos');
//     for (const row of res.rows) {
//         console.log(row);
//     }
// })();

module.exports = pool;
