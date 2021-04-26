const database = require("../setup")

module.exports = (email, senha) => new Promise((resolve, reject) => {
  const sql = 'select u.id, u.nome, u.email, u.data_nasc, u.telefone, u.cpf, u.senha from usuario as u where email = ?';
  const values = [email]; 

  database.query(sql, values, (errors, results, fields) => {
    if(errors) {
      reject(errors);
      return;
    }

    if(results.length === 0) {
      reject(new Error('Email ou senha errados'));
      return;
    }

    resolve(results[0]);
    return;
  }); 
})