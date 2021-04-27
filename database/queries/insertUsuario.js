const database = require("../setup");
const { crypt } = require('../../utils/crypto');
const { DuplicationError } = require('../../utils/errors');

module.exports = async (body) => {
  return new Promise((resolve, reject) => {
    const {
      nome,
      email,
      data_nasc,
      cpf,
      senha,
      telefone,
    } = body;

    const sql = 'INSERT INTO usuario(nome, email, senha, cpf, data_nasc, telefone) values (?, ?, ?, ?, ?, ?)';
    const values = [nome, email, crypt(senha), cpf.replace(/[^0-9]/g, ''), data_nasc, telefone.replace(/[^0-9]/g, '')]; 

    database.query(sql, values, (err, results, fields) => {
      if(err) {     
        if(err.code == 'ER_DUP_ENTRY')  {
          reject(new DuplicationError(err.sqlMessage));
          return;
        }

        reject(err);
        return;
      }

      resolve(results);
      return;
    })
  })
}