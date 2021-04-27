const { NotFoundError } = require("../../utils/errors");
const database = require("../setup")

module.exports = (nome) => new Promise((resolve, reject) => {
  let sql = 'select * from usuario'
  let values = []

  if(nome) {
    sql += ' where nome like ?';
    values.push(`%${nome}%`);
  }

  database.query(sql, values, (errors, results, fields) => {
    if(errors) {
      reject(errors);
      return;
    }

    resolve(results);
    return;
  })
})