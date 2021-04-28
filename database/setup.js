const mysql = require('mysql');

const database = mysql.createConnection({
    host     : process.env.DB_HOST || 'localhost',
    user     : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || 'password',
    database : process.env.DB_DATABASE || 'web1'
});

module.exports = database;
