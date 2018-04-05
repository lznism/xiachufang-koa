const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'lznism',
    connectionLimit: 10
});

module.exports = pool;