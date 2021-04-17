const perfilValidator = require("../../validator/perfil");
const database = require("../../database/setup");

module.exports = (req, res, body) => {
    console.log('Rota post perfil', body)
    try {
        const id = JSON.parse(req.headers.cookie.user).id;

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
            throw new Error('Enviar um campo é obrigatório');
        }

        sql += `where id = ?`
        values.push(id);
        
        database.query(sql, values, (errors, results, fields ) => {
            console.log(errors, results);
            res.end('ok');
        });
    } catch (err) {
        console.warn(err);
        res.end(err.message);
    }
    
}