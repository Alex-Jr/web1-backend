const perfilValidator = require("../../validator/perfil");
const updateUsuario = require("../../database/queries/updateUsuario");
const insertSessao = require('../../database/queries/insertSessao');
const selectUsuario = require("../../database/queries/selectUsuarioById");
const authenticator = require("../../utils/authenticator");
const { generateToken } = require("../../utils/crypto");

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  try {
    const body = req.body;
    
    const user = await authenticator(req);

    perfilValidator(body);

    delete body.confsenha;

    await updateUsuario(user.id, body);

    const updatedUser = await selectUsuario(user.id);

    const token = generateToken();

    await insertSessao(token, updatedUser.id);
    
    updatedUser.token = token;
    
    delete updatedUser.senha;
    
    res.statusCode = 200;
    res.end(JSON.stringify(updatedUser));
  } catch (err) {
    console.warn(err);

    switch (err.name) {
      case 'ValidationError': 
        res.statusCode = err.statusCode;
        res.end(err.message);
        break
      case 'AuthorizationError':
        res.statusCode = err.statusCode;
        res.end('Acesso negado');
        break;
      case 'DuplicationError':
        res.statusCode = err.statusCode;
        res.end(err.message);
        break;
      default :
        res.statusCode = 500;
        res.end('Internal server error');
        break;
    }
  }
} 