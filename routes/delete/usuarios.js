const database = require("../../database/setup");
const authenticator = require("../../utils/authenticator");

module.exports = async (req, res) => {
  try {
    await authenticator(JSON.parse(req.headers.cookie.user).token);

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

    switch(err.name) {
      case 'AuthorizationError':
        res.statusCode = 403;
        res.end('Acesso negado');
        break;
      default:
        res.statusCode = 500;
        res.end('Internal server error');
        break;
    }
  }
}