const deleteUsuario = require("../../database/queries/deleteUsuario");
const authenticator = require("../../utils/authenticator");

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  try {
    const user = await authenticator(req);

    await deleteUsuario(user.email);
    
    res.statusCode = 200;
    res.end('Usuário deletado com sucesso');
  } catch (err) {
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