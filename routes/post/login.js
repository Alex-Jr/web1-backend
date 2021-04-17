const loginValidator = require("../../validator/login");
const database = require("../../database/setup");

const { ServerResponse } = require('http')

/**
 * 
 * @param {*} req 
 * @param {ServerResponse} res 
 * @param {*} body 
 */
module.exports = (req, res, body) => {
    console.log('Rota post login', body)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    try {
        loginValidator(body);

        const {
            email,
            senha,
        } = body;

        const sql = 'select * from usuario where email = ? and senha = ?';
        const values = [email, senha]; 

        database.query(sql, values, (errors, results, fields ) => {
            if(errors) {
                res.statusCode = 500;
                res.end('Internal server error');
            } else {
                if(results.length === 0) {
                    res.statusCode = 401;
                    res.end('Login ou senha inválidos');
                } else {
                    res.end(JSON.stringify(results[0]));
                }

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