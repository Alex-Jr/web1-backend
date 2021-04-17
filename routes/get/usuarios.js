const database = require("../../database/setup")

module.exports = (req, res, params) => {
    try {
        console.log('Requested list usuarios');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        let sql = 'select * from usuario'
        let values = []
        if(params) {
            sql += ' where nome like ?';
            values = `%${params.nome.split('%20').join(' ')}%`;
        }
        
        database.query(sql, values,(errors, results, fields) => {
            if(errors) {
                throw new Error('SQL Error');
            } else {
                res.end(JSON.stringify(results));
            }
    
        })

    } catch(error) {
        res.statusCode = 500;
        res.end('Internal server error')
    }
}