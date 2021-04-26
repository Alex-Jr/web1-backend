const loginValidator = require("../../validator/login");
const { decrypt, generateToken } = require('../../utils/crypto');
const selectUsuario = require("../../database/queries/selectUsuario");
const insertSessao = require("../../database/queries/insertSessao");
const { AuthorizationError } = require("../../utils/errors");

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  try {
    const body = req.body;
    
    
    loginValidator(body);
    
    const {
      email,
      senha,
    } = body;

    const user = await selectUsuario(email);

    if(decrypt(user.senha) !== senha) throw new AuthorizationError('Não autorizado');

    const token = generateToken();

    await insertSessao(token, user.id);

    user.token = token;

    delete user.senha;
    delete user.id;

    res.statusCode = 200;
    res.end(JSON.stringify(user));
  } catch (err) {
    console.warn(err);
    
    switch (err.name) {
      case 'ValidationError': 
        res.statusCode = 400;
        res.end(err.message)
        break;
      case 'AuthorizationError':
      case 'NotFoundError': 
        res.statusCode = 403;
        res.end('Email ou senha errados');
        break;
      default :
        res.statusCode = 500;
        res.end('Internal server error');
        break;
    }
  } 
}