const { ValidationError } = require("../classes/errors");

function isEmailValido(email) {
  const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  return emailRegex.test(email);
}

function isSenhaValida(senha) {
  return senha;
}

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