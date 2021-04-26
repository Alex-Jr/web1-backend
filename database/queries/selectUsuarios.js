const database = require("../setup")

module.exports = (token) => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM sessao WHERE token = ?';
  const values = [token]; 

  database.query(sql, values, (errors, results, fields) => {
    if(errors) {
      reject(errors);
      return;
    }

    if(results.length === 0) {
      reject(new Error('Token não encontrado'));
      return;
    }

    resolve(results[0]);
    return;
  }); 
})