function validarCpf(cpf){
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
  for (let i = 0; i <= 8; i ++){
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


function validarNome(nome){
  if(nome.length < 3) return false;

  const regex = /^[a-zA-Záéíóúâêîôûàèìòù\'\ ]+$/g;

  return regex.test(nome);
}

function validarEmail(email){
  const antes = email.substring(0, email.indexOf('@'));  //antes do primeiro @
  const depois = email.substring(email.indexOf('@')+ 1, email.length); //depois do primeiro @

  return !(
    (email.search(' ') != -1) || // caso tenha espaços
    (email.search('@') == -1) || // caso não tenha @ no email
    (depois.search('@') != -1) || // caso tenha @ no depois
    (depois.search(/[.]/g) < 1) || // caso não tenha ponto no depois
    (depois.lastIndexOf('.') == depois.length - 1) || // caso o ponto seja ultimo caracter
    (antes.length < 1) || //caso antes seja menor que 1
    (depois.length < 4)  //caso depois seja menor que 4
  );
}

function validarSenha(senha){ 
  return 5 < senha.length && senha.length < 25;
}

function validarData(datanasc){ 
  const dataRegex = new RegExp(/^(\d{4})\-(\d{2})\-(\d{2})/);

  const formatoValido = dataRegex.test(data);

  if(!formatoValido) return false;

  const hoje = new Date();
  const nasc  = new Date(data);

  const mes = hoje.getMonth() - nasc.getMonth();

  let idade = hoje.getFullYear() - nasc.getFullYear();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())){
      idade--;
  };

  return (0 < idade && idade < 110);
}

function validarTelefone(telefone) {
  telefone = telefone.replace(/[^0-9]/g, '');

  return (telefone.length == 11 || telefone.length == 10);
}

function confirmarSenha(senha, confsenha){
  return confsenha === senha;
}