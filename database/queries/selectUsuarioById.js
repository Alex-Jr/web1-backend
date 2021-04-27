const database = require("../setup")
const { NotFoundError } = require("../../utils/errors");

module.exports = (id) => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM usuario WHERE id = ?';
  const values = [id]; 

  database.query(sql, values, (errors, results, fields) => {
    if(errors) {
      reject(errors);
      return;
    }

    if(results.length === 0) {
      reject(new NotFoundError('Usuário não encontrado'));
      return;
    }

    resolve(results[0]);
    return;
  }); 
})