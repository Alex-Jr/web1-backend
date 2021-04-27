window.history.replaceState({}, "Login", 'login.html');

function login() {
  let valido = true;
  let errors = [];

  let email = document.getElementById('email');
  let senha = document.getElementById('senha');

  if (
    email.value == "" 
    || senha.value == ""
  ){
    alert("Campos obrigatórios!");
    return;
  }

  if (validarEmail(email.value) == false){ 
    valido = false;
    email.setCustomValidity('Email inválido');
    errors.push('Email inválido');
  } else {
    email.setCustomValidity('');
  }
    
  if (validarSenha(senha.value) == false) {
    valido = false;
    senha.setCustomValidity('Senha inválida');
    errors.push('Senha inválida');
  } else {
    senha.setCustomValidity('');
  }  

  if (!valido) {
    alert(errors.join('\n'));
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
