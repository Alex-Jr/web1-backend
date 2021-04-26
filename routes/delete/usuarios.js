const database = require("../../database/setup")

module.exports = (req, res) => {
  try {
    console.log('DELETE usuarios');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    const sql = 'delete from usuario where email = ?';
    const values = [JSON.parse(req.headers.cookie.user).email];
    
    database.query(sql, values,(errors, results, fields) => {
      if(errors) {
        console.warn(errors);
        res.statusCode = 500;
        res.end('Internal server error');
      } else {
        res.end('ok');
      }
    })
  } catch (err) {
    console.warn(err);
    res.statusCode = 500;
    res.end('Internal server error');
  }
}