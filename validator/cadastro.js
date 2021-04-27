const { ValidationError } = require("../utils/errors");

const { 
  isConfSenhaValida,
  isCpfValido,
  isDataNascValida,
  isEmailValido,
  isNomeValido,
  isSenhaValida,
  isTelefoneValido
} = require("./validators");


module.exports = (body) => {
  const {
    nome,
    email,
    data_nasc,
    cpf,
    senha,
    confsenha,
    telefone,
  } = body;

  const validationErrors = [];
  
  if(!isNomeValido(nome)) validationErrors.push('Nome inválido');

  if(!isSenhaValida(senha)) validationErrors.push('Senha inválida');

  if(!isCpfValido(cpf)) validationErrors.push('CPF inválido');

  if(!isDataNascValida(data_nasc)) validationErrors.push('Data inválida');

  if(!isConfSenhaValida(confsenha, senha)) validationErrors.push('Senhas não são iguais');

  if(!isEmailValido(email)) validationErrors.push('Email inválido');

  if(!isTelefoneValido(telefone)) validationErrors.push('Telefone inválido');

  if(validationErrors.length > 0) {
      throw new ValidationError(validationErrors.join('/'));
  }

  return body;
}