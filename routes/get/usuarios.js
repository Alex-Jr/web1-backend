const database = require("../../database/setup")

module.exports = (req, res) => {
    const sql = 'select * from usuario'
    database.query(sql, (erros, results, fields) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        res.end(JSON.stringify(results));
    })
}