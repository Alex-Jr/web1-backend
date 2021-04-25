window.addEventListener('load', function () {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const datanasc = document.getElementById("datanasc");
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");

  const parsedCookie = JSON.parse(cookies.user);

  nome.placeholder = parsedCookie.nome;
  email.placeholder = parsedCookie.email;
  datanasc.placeholder = parsedCookie.data_nasc.substring(0, parsedCookie.data_nasc.indexOf("T"));
  cpf.placeholder = parsedCookie.cpf;
  telefone.placeholder= parsedCookie.fone;
})


function deletarConta() {   
  if(!window.confirm("Tem certeza que quer excluir?")) return;

  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        logout();
    }
  };

  xhttp.open("DELETE", `usuarios`, true);

  xhttp.send();
}

function editar() {
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
    && senha.value == ""
    && confsenha.value == "" 
    && nome.value == "" 
    && datanasc.value == "" 
    && cpf.value == "" 
    && telefone.value == ""
  ) {
    alert("Todos os campos estão vazios!");
    return;
  }

  if (nome.value && validarNome(nome.value) == false){
    valido = false;
    errors.push("Nome inválido!");
    nome.setCustomValidity('Nome inválido');
  } else {
    nome.setCustomValidity('');
  };
  
  if (email.value && validarEmail(email.value) == false){
    valido = false;
    errors.push("E-mail inválido!");
    email.setCustomValidity('Email inválido');
  } else {
    email.setCustomValidity('');
  };

  if (datanasc.value  && validarData(datanasc.value) == false){
    valido = false;
    errors.push("Data inválida!");
    datanasc.setCustomValidity('Data inválida');
  } else {
    datanasc.setCustomValidity('');
  }

  if (cpf.value && validarCpf(cpf.value) == false){
    valido = false;
    errors.push("CPF inválido!");
    cpf.setCustomValidity('CPF inválido');
  } else {
    cpf.setCustomValidity('');
  };

  if (senha.value && validarSenha(senha.value) == false){
    valido = false;
    errors.push("Senha inválida!");
    senha.setCustomValidity('Senha inválida');
  } else {
    senha.setCustomValidity('');
  };

  if (senha.value && confirmarSenha(senha.value, confsenha.value) == false){
    valido = false;
    errors.push("Senha incompatível");
    confsenha.setCustomValidity('Senhas diferentes');
  } else {
    confsenha.setCustomValidity('');
  };

  if (telefone.value && validarTelefone(telefone.value) == false){
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
    if (this.readyState == 4) {
      switch(this.status) {
        case 200:
          alert('Usuário atualizado')
          window.location.assign("/home.html");
          break
        case 400:
          alert(this.response.split('/').join('\n'));
          break
        case 409:
          let msg = 'Já existe um usuário utilizando \n'
          let infos = this.response.match(/\'(.*?)\'/g);
          msg += infos[0]
          alert(msg);
          break;
        default: 
          alert(this.response)
          break
      }
    }
  };

  xhttp.open("POST", 'perfil.html', true);

  let bodyRequest = ''

  const form = document.forms['formulario'];

  for (input of form) {
    if(!input.name) continue;
    bodyRequest += `${input.name}=${input.value}&`;
  }

  xhttp.send(bodyRequest);
};
