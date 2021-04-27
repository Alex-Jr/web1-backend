const database = require("../setup")
const { DuplicationError, ValidationError } = require("../../utils/errors");
const { crypt } = require("../../utils/crypto");

module.exports = (email, params) => new Promise((resolve, reject) => {
  if(!email) throw new ValidationError('Internal server error');

  let sql = 'UPDATE usuario SET ';
  const values = [];

  delete params.confsenha;

  let first = true;

  for (const [key, value] of Object.entries(params)) {
    if(value) {
      if(first) {
        sql += `${key} = ?`;
        first = false;
      } else {
        sql += `, ${key} = ?`;
      }

      switch(key) {
        case 'telefone':
        case 'cpf':  
          values.push(value.replace(/[^0-9]/g, ''));
          break;
        case 'senha':
          values.push(crypt(value));
          break;
        default:
          values.push(value);
          break;
      }
    }
  }
  
  if(sql === 'UPDATE usuario SET ') {
    throw new ValidationError('Enviar um campo é obrigatório');
  }

  sql += ` WHERE email = ?`
  values.push(email);
  
  database.query(sql, values, (err, results, fields ) => {
    if(err) {
      if(err.code === 'ER_DUP_ENTRY') {
        reject(new DuplicationError(err.sqlMessage));
        return;
      }

      reject(err);
      return;
    } 
    resolve('Usuário atualizado');
    return;
  });
})