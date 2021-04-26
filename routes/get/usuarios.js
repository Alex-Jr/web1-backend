const listUsers = require("../../database/queries/listUsers");

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  try {
    const { nome } = req.params;

    const users = await listUsers(nome);
    
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  } catch(error) {
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
