const database = require("../../database/setup");
const loginValidator = require("../../validator/login");
const { decrypt } = require('../../utils/crypto');

module.exports = (req, res) => {
try {
  const body = req.body;
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  loginValidator(body);

  const {
    email,
    senha,
  } = body;

  const sql = 'select u.nome, u.email, u.data_nasc, u.fone, u.cpf, u.senha from usuario as u where email = ?';
  const values = [email]; 

  database.query(sql, values, (errors, results, fields) => {
    if(errors) {
      console.warn(err);

      res.statusCode = 500;
      res.end('Internal server error');
      return;
    }

    if(results.length === 0) {
      res.statusCode = 401;
      res.end('Email ou senha errados');
      return;
    }
    const user = results[0];

    if(decrypt(user.senha) !== senha){
      res.statusCode = 400;
      res.end('Email ou senha errados');
      return;
    }

    delete user.senha;

    res.end(JSON.stringify(user));
  }); 
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