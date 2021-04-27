const database = require("../setup")

module.exports = (id) => new Promise((resolve, reject) => {
  const sql = 'SELECT * FROM sessao WHERE userId = ?';
  const values = [id]; 

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