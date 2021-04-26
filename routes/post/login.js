const loginValidator = require("../../validator/login");
const { decrypt, generateToken } = require('../../utils/crypto');
const selectUser = require("../../database/queries/selectUser");
const insertSessao = require("../../database/queries/insertSessao");

module.exports = async (req, res) => {
  try {
    const body = req.body;
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    loginValidator(body);

    const {
      email,
      senha,
    } = body;

    const user = await selectUser(email);

    if(decrypt(user.senha) !== senha) throw new Error('Não autorizado');

    const token = generateToken();

    await insertSessao(token, user.id);

    user.token = token;

    delete user.senha;
    delete user.id;

    res.end(JSON.stringify(user));

  } catch (err) {
    console.warn(err);

    switch (err.name) {
      case 'ValidationError': 
        res.statusCode = 400;
        res.end(err.message)
        break
      default :
        res.statusCode = 500;
        res.end('Internal server error');
        break;
    }
  } 
}