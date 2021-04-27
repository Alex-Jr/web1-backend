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
    datanasc,
    cpf,
    senha,
    confnovasenha,
    telefone,
  } = body;

  const validationErrors = [];
  
  if(nome && !isNomeValido(nome)) validationErrors.push('Nome inválido');

  if(senha && !isSenhaValida(senha)) validationErrors.push('Senha inválida');

  if(cpf && !isCpfValido(cpf)) validationErrors.push('CPF inválido');

  if(datanasc && !isDataNascValida(datanasc)) validationErrors.push('Data inválida');

  if(confnovasenha && !isConfSenhaValida(confnovasenha, senha)) validationErrors.push('Senhas não são iguais');

  if(email && !isEmailValido(email)) validationErrors.push('Email inválido');

  if(telefone && !isTelefoneValido(telefone)) validationErrors.push('Telefone inválido');

  if(validationErrors.length > 0) {
    throw new ValidationError(validationErrors.join('/'));
  }

  return body;
}