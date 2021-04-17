const database = require("../../database/setup")

module.exports = (req, res, params) => {
    console.log('Requested delete usuarios');

    const sql = 'delete from usuario where id = ?';
    const values = [JSON.parse(req.headers.cookie.user).id];
   
    database.query(sql, values,(errors, results, fields) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        res.end('ok');
    })
}