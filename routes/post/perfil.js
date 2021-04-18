const perfilValidator = require("../../validator/perfil");
const database = require("../../database/setup");
const { ValidationError } = require("../../classes/errors");

module.exports = (req, res) => {
    try {
        const body = req.body;
        const id = JSON.parse(req.headers.cookie.user).id;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        perfilValidator(body);

        // sql += nome = ?
        // values.push(nome)

        let sql = 'update usuario set ';
        const values = [];

        for(const [key, value] of Object.entries(body)) {
            if(value) {
                sql += `${key} = ? `
                values.push(value);
            }
        }

        if(sql === 'update usuario set ') {
            throw new ValidationError('Enviar um campo é obrigatório');
        }

        sql += `where id = ?`
        values.push(id);
        
        database.query(sql, values, (errors, results, fields ) => {
            if(errors) {
                if(errors.code === 'ER_DUP_ENTRY') {
                    res.statusCode = 409;
                    res.end(errors.sqlMessage);
                } else {
                    res.statusCode = 500;
                    res.end('Internal server error');
                }
            } else {
                res.end('ok');
            }
        });
    } catch (err) {
        console.warn(err);

        switch (err.name) {
            case 'ValidationError': 
                res.statusCode = 400;
                res.end(err.message)
                break
            default :
                res.statusCode = 500;
                res.end('Internal server error');
                break;
        }
    }
    
}