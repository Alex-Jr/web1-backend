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
    try {
        loginValidator(body);

        const {
            email,
            senha,
        } = body;

        const sql = 'select * from usuario where email = ? and senha = ?';
        const values = [email, senha]; 

        database.query(sql, values, (errors, results, fields ) => {
            console.log(errors, results);
            res.statusCode = 200;
            res.end(JSON.stringify({user: results[0]}))
        }); 
    } catch (err) {
        console.warn(err);
        res.end('Falha');
    }
    
}