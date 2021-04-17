const { ValidationError } = require("../utils/errors");

function isNomeValido(nome) {
    const nomeRegex = new RegExp(/[a-z,A-Z,á,é,í,ó,ú,â,ê,ô,ã,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô,Ã,Õ,Ç,ü,ñ,Ü,Ñ,' ']+/);


    return nomeRegex.test(nome);
}


function isSenhaValida(senha){
    return senha && senha.length > 5
}

function isConfSenhaValida(confisenha, senha) {
    return confisenha === senha
}

function isCpfValido(cpf) {
    cpf = cpf.replace(/[^0-9]/g, "");

    const invalid = [
        '00000000000',
        '11111111111', '22222222222', '33333333333',
        '44444444444', '55555555555', '66666666666',
        '77777777777', '88888888888', '99999999999'
    ];

    if (invalid.includes(cpf)) return false;

    if(cpf.length > 11 || cpf.length < 11) return false;

    let soma = 0;
    // soma os 9 primeiros digitos, multiplicado por 10 - indice
    for (let i = 0; i <= 8; i++){
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = soma % 11

    let digVerificador1 = 11 - resto;
    let digVerificador2;

    if(digVerificador1 !== parseInt(cpf.charAt(9))) return false;

    if(digVerificador1 >= 10) {
        digVerificador2 = 0;

        if(digVerificador2 !== parseInt(cpf.charAt(10))) return false;
    }


    soma = 0;
    // soma os 10 primeiros digitos, multiplicados por 11 - indice
    for (let i = 0; i <= 9; i++){
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = soma % 11;
    digVerificador2 = 11 - resto;

    if(digVerificador2 !== parseInt(cpf.charAt(10))) return false;

    return true
}

function isDataNascValida(data) {
    const dataRegex = new RegExp(/^(\d{4})\-(\d{2})\-(\d{2})/);

    return dataRegex.test(data);
}

// alterar dps
function isEmailValido(email) {
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return emailRegex.test(email);
}

function isTelefoneValido(telefone) {
    const telefoneRegex = new RegExp(/^(\d{5}|\d{4})\D*(\d{4})$/);

    return telefoneRegex.test(telefone);
}

module.exports = (body) => {
    const {
      nome,
      email,
      datanasc,
      cpf,
      senha,
      confsenha,
      telefone,
    } = body;

    const validationErrors = [];
    
    if(!isNomeValido(nome)) validationErrors.push('Nome inválido');
  
    if(!isSenhaValida(senha)) validationErrors.push('Senha inválida');

    if(!isCpfValido(cpf)) validationErrors.push('CPF inválido');

    if(!isDataNascValida(datanasc)) validationErrors.push('Data inválida');

    if(!isConfSenhaValida(confsenha, senha)) validationErrors.push('Senhas não são iguais');

    if(!isEmailValido(email)) validationErrors.push('Email inválido');

    if(!isTelefoneValido(telefone)) validationErrors.push('Telefone inválido');

    if(validationErrors.length > 0) {
        throw new ValidationError(validationErrors.join('/'));
    }

    return body;
  }