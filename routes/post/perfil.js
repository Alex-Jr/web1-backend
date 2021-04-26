const perfilValidator = require("../../validator/perfil");
const updateUsuario = require("../../database/queries/updateUsuario");
const authenticator = require("../../utils/authenticator");

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  try {
    const body = req.body;
    
    const user = await authenticator(req);

    perfilValidator(body);

    await updateUsuario(user.email, body);

    res.statusCode = 200;
    res.end('Usuário atualizado');
  } catch (err) {
    console.warn(err);

    switch (err.name) {
      case 'ValidationError': 
        res.statusCode = 400;
        res.end(err.message);
        break
      case 'AuthorizationError':
        res.statusCode = 403;
        res.end('Acesso negado');
        break;
      case 'DuplicationError':
        res.statusCode = 409;
        res.end(err.message);
        break;
      default :
        res.statusCode = 500;
        res.end('Internal server error');
        break;
    }
  }
}