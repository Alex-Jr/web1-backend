const cadastroValidator = require("../../validator/cadastro");
const database = require("../../database/setup");

module.exports = (req, res, body) => {
    console.log('Rota post cadastro', body)
    
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;

    try {
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
        const values = [ nome, email, senha, cpf, datanasc, telefone.replace('-', '')]; 

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