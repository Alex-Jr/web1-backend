const database = require("../setup")
const { NotFoundError } = require("../../utils/errors");

module.exports = (email) => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM usuario WHERE email = ?';
  const values = [email]; 

  console.log(sql);
  console.log(values);

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