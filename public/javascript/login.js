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


function login(){
  let email = document.getElementById('email');
  let senha = document.getElementById('senha');
  //verificar se campos estão vazios
  if (email.value == '' && senha.value == '') {
    email.setCustomValidity('Email é obrigatório');

    senha.setCustomValidity('Senha é obrigatório');

    alert('Email e senha obrigatórios!');
    return;
  } 
    
  if (email.value == '') {
    email.setCustomValidity('Email é obrigatório');
    
    senha.setCustomValidity('');
    alert('Email obrigatório!');
    return;
  }

  if (senha.value == '') {
    senha.setCustomValidity('Senha é obrigatória');
    
    email.setCustomValidity('');
    alert('Senha obrigatória!');
    return;
  }
  //validando inputs
  if (validacaoSenha(senha.value) == false) {
    senha.setCustomValidity('Senha inválida');
    email.setCustomValidity('');
    alert('Senha obrigatória!');
    return;
  }

  if (validacaoEmail(email.value) == false){ 
    email.setCustomValidity('Email inválido');
  
    senha.setCustomValidity('');

    alert('Email inválido!');
    return;
  }

  email.setCustomValidity('');
  senha.setCustomValidity('');

  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      switch(this.status) {
        case 200:
          document.cookie = `user=${this.responseText}`;
          document.cookie = 'logged=true';
          window.location.assign('/home.html');
          break
        default: 
          email.setCustomValidity('Email inválido');
          senha.setCustomValidity('Senha inválida');

          alert(this.responseText);
          break
      }
    }
  };

  xhttp.open('POST', 'login.html', true);

  xhttp.send(`email=${email.value}&senha=${senha.value}`);
} 
