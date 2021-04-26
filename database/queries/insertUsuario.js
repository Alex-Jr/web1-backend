const database = require("../setup");
const { crypt } = require('../../utils/crypto');
const deleteSessao = require("./deleteSessao");

module.exports = async (body) => {
  return new Promise((resolve, reject) => {
    const {
      nome,
      email,
      datanasc,
      cpf,
      senha,
      telefone,
    } = body;

    const sql = 'INSERT INTO usuario(nome, email, senha, cpf, data_nasc, telefone) values (?, ?, ?, ?, ?, ?)';
    const values = [ nome, email, crypt(senha), cpf.replace(/[^0-9]/g, ''), datanasc, telefone.replace(/[^0-9]/g, '')]; 

    database.query(sql, values, (err, results, fields) => {
      if(err) {
        // errors.code === 'ER_DUP_ENTRY') 
        reject(err);
        return
      }

      resolve(results);
      return;
    })
  })
}