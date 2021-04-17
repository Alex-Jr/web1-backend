const database = require("../../database/setup")

module.exports = (req, res, params) => {
    let sql = 'select * from usuario'
    let values = []
    if(params) {
        sql += ' where nome like ?';
        values = `%${params.nome.split('%20').join(' ')}`;
    }

    database.query(sql, values,(errors, results, fields) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        res.end(JSON.stringify(results));
    })
}