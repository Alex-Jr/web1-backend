const mysql = require('mysql');

const database = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'web1'
});

module.exports = database;
