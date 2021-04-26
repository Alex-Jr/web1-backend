const database = require("../setup")

module.exports = async (userId) => new Promise((resolve, reject) => {
  const sql = 'DELETE FROM sessao WHERE userId = ?';
  const values = [userId];

  database.query(sql, values, (err, results, fields) => {
    if(err) {
      reject(err);
      return
    }

    resolve(results);
    return;
  })
})