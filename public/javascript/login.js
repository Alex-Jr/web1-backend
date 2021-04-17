function validacaoEmail(email){
    antes = email.substring(0, email.indexOf("@"));  //antes do primeiro @
    depois = email.substring(email.indexOf("@")+ 1, email.length); //depois do primeiro @
   
    if (
        (antes.search(" ") != -1) || //caso tenha espaços
        (depois.search(" ") != -1) || //caso tenha espaços
        (email.search("@") == -1) || //caso não tenha @ no email
        (antes.search("@") != -1) || //caso tenha @ no antes
        (depois.search("@") != -1) || //caso tenha @ no depois
        (depois.search(/[.]/g) < 1) || //caso não tenha ponto no depois
        (depois.lastIndexOf(".") == depois.length -1) || //caso o ponto seja ultimo caracter
        (antes.length <1) || //caso antes seja menor que 1
        (depois.length <4)  //caso depois seja menor que 4

    ){
        return false;
    }
    else{
        return true;
    }
}

function validacaoSenha(senha){ 
    if(senha.length<5 || senha.length>25){ //min 5, max 24
        return false;
    }else{
        return true;
    }
}


function entrar(){
    let email = document.getElementById("email");
    let senha = document.getElementById("senha");
    //verificar se campos estão vazios
    if(email.value =="" && senha.value==""){
        document.getElementById("texto_erro").innerHTML = "Email e senha obrigatórios!";
        email.style.border="solid";
        senha.style.border="solid";

        email.style.borderColor="red";
        senha.style.borderColor="red";
        return;
    }else if(email.value == ""){
        document.getElementById("texto_erro").innerHTML = "Email obrigatório!";
        email.style.border="solid";
        email.style.borderColor="red";

        senha.style.border="none";
        return;
    }else if(senha.value==""){
        document.getElementById("texto_erro").innerHTML = "Senha obrigatória!";
        senha.style.border="solid";
        senha.style.borderColor="red";
        email.style.border="none";
        return;
    }
    //validando inputs
    else if(validacaoSenha(senha.value)==false){
        document.getElementById("texto_erro").innerHTML = "Senha inválida!";
        senha.style.border="solid";
        senha.style.borderColor="red";
        email.style.border="none";
        return;
    }
    else if(validacaoEmail(email.value)==false){ 
        document.getElementById("texto_erro").innerHTML = "Email inválido!";
        email.style.border="solid";
        email.style.borderColor="red";
        senha.style.border="none";
        return;
    }else{  //SO PRA TESTAR, ENQUANTO NÃO TEMOS BACKEND
        document.getElementById("texto_erro").innerHTML = "OK";
        email.style.border="none";
        senha.style.border="none";
    }
} 
