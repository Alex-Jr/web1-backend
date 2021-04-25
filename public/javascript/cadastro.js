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

function validacaoEmail(email){
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

function validacaoSenha(senha){ 
  return !(senha.length < 5 || senha.length > 25);
}

function validarData(datanasc){ 
  const hoje = new Date();
  const nasc  = new Date(datanasc);

  const mes = hoje.getMonth() - nasc.getMonth();

  let idade = hoje.getFullYear() - nasc.getFullYear();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())){
      idade--;
  };

  return (idade < 110 && idade > 0);
}

function validarTelefone(telefone) {
  telefone = telefone.replace(/[^0-9]/g, '');
  console.log(telefone);

  return (telefone.length == 11 || telefone.length == 10);
}

function confirmarSenha(senha, confsenha){
  return confsenha === senha;
}

function cadastrar(){
  let valido = true;
  const errors = [];

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const datanasc = document.getElementById("datanasc");
  const cpf = document.getElementById("cpf");
  const senha = document.getElementById("senha");
  const confsenha = document.getElementById("confsenha");
  const telefone = document.getElementById("telefone");

  if (
    email.value == "" 
    || senha.value == ""
    || confsenha.value == "" 
    || nome.value == "" 
    || datanasc.value == "" 
    || cpf.value == "" 
    || telefone.value == ""
  ) {
    alert("Campos obrigatórios!");
    return;
  }

  if (validarNome(nome.value) == false){
    valido = false;
    errors.push("Nome inválido!");
    nome.setCustomValidity('Nome inválido');
  } else {
    nome.setCustomValidity('');
  };
  
  if (validacaoEmail(email.value) == false){
    valido = false;
    errors.push("E-mail inválido!");
    email.setCustomValidity('Email inválido');
  } else {
    email.setCustomValidity('');
  };

  if (validarData(datanasc.value) == false){
    valido = false;
    errors.push("Data inválida!");
    datanasc.setCustomValidity('Data inválida');
  } else {
    datanasc.setCustomValidity('');
  }

  if (validarCpf(cpf.value) == false){
    valido = false;
    errors.push("CPF inválido!");
    cpf.setCustomValidity('CPF inválido');
  } else {
    cpf.setCustomValidity('');
  };

  if (validacaoSenha(senha.value) == false){
    valido = false;
    errors.push("Senha inválida!");
    senha.setCustomValidity('Senha inválida');
  } else {
    senha.setCustomValidity('');
  };

  if (confirmarSenha(senha.value, confsenha.value) == false){
    valido = false;
    errors.push("Senha incompatível");
    confsenha.setCustomValidity('Senhas diferentes');
  } else {
    confsenha.setCustomValidity('');
  };

  if (validarTelefone(telefone.value) == false){
    valido = false;
    errors.push("Telefone inválido!");
    telefone.setCustomValidity('Telefone inválido');
  } else {
    telefone.setCustomValidity('');
  };

  if (!valido) {
    alert(errors.join('\n'));
    return;
  }

  const xhttp = new XMLHttpRequest();
    
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4) {
      switch(this.status) {
        case 200:
          window.location.assign("/login.html");
          break;
        case 400:
          alert(this.response.split('/').join('\n'));
          break;
        case 409:
          let msg = 'Já existe um usuário utilizando \n'
          let infos = this.response.match(/\'(.*?)\'/g);
          msg += infos[0]
          alert(msg);
          break;
        default: 
          alert(this.response)
          break;
      }
    }
  };

  xhttp.open("POST", `cadastro.html`, true);

  let bodyRequest = ''

  const form = document.forms['formulario'];

  for (input of form) {
    if(!input.name) continue;
    bodyRequest += `${input.name}=${input.value}&`;
  }
  
  xhttp.send(bodyRequest);
};

