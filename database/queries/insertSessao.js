const database = require("../setup");
const deleteSessao = require("./deleteSessao");
const { crypt } = require('../../utils/crypto');

module.exports = async (token, userId) => {
  await deleteSessao(userId);

  return new Promise((resolve, reject) => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const sql = 'INSERT INTO sessao VALUES (?, ?, ?)';
    const values = [crypt(token), userId, date];

    database.query(sql, values, (err, results, fields) => {
      if(err) {
        reject(err);
        return
      }

      resolve(results);
      return;
    })
  })
}