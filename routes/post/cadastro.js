const database = require("../../database/setup");
const cadastroValidator = require("../../validator/cadastro");
const { crypt } = require('../../utils/crypto');

module.exports = (req, res) => {    
    try {
        const body = req.body;
    
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 200;

        cadastroValidator(body);

        const {
            nome,
            email,
            datanasc,
            cpf,
            senha,
            telefone,
        } = body;

        const sql = 'insert into usuario(nome, email, senha, cpf, data_nasc, fone) values (?, ?, ?, ?, ?, ?)';
        const values = [ nome, email, crypt(senha), cpf.replace(/[^0-9]/g, ''), datanasc, telefone.replace(/[^0-9]/g, '')]; 

        database.query(sql, values, (errors, results, fields ) => {
            if(errors) {
              console.warn(errors);
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