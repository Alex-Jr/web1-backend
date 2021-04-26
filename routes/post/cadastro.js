const cadastroValidator = require("../../validator/cadastro");
const insertUsuario = require("../../database/queries/insertUsuario");

module.exports = async (req, res) => {    
  res.setHeader('Content-Type', 'text/plain');

  try {
    const body = req.body;

    
    cadastroValidator(body);
    
    await insertUsuario(body);

    res.statusCode = 200;
    res.end('Usuário cadastro');
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