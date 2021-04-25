const { ValidationError } = require("../classes/errors");

const { 
  isEmailValido,
  isSenhaValida,
} = require("./validators");

module.exports = (body) => {
  const {
    email,
    senha
  } = body 
  
  const validationErrors = [];

  if(!isEmailValido(email)) validationErrors.push('Email inválido');

  if(!isSenhaValida(senha)) validationErrors.push('Senha é obrigatória');

  if(validationErrors.length > 0) {
    throw new ValidationError(validationErrors.join('/'));
  }

  return body;
}