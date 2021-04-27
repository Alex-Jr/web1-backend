const listUsuario = require("../../database/queries/listUsuario");

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  try {
    const { nome } = req.params;

    const users = await listUsuario(nome);
    
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  } catch(error) {
    console.warn(err);

    switch(err.name) {
      case 'AuthorizationError':
        res.statusCode = err.statusCode;
        res.end('Acesso negado');
        break;
      default:
        res.statusCode = 500;
        res.end('Internal server error');
        break;
    }
  }
}
