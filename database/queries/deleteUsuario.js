const database = require("../setup")

module.exports = async (email) => new Promise((resolve, reject) => {
  const sql = 'DELETE FROM usuario WHERE email = ?';
  const values = [email];

  database.query(sql, values, (err, results, fields) => {
    if(err) {
      reject(err);
      return
    }

    resolve(results);
    return;
  })
})