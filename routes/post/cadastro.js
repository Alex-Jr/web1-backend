const cadastroValidator = require("../../validator/cadastro");
const database = require("../../database/setup");

module.exports = (req, res, body) => {
    console.log('Rota post cadastro', body)
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
            console.log(errors, results);
            res.end('ok');
        });
    } catch (err) {
        console.warn(err);
        res.end('Falha');
    }
    
}