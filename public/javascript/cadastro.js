function validarcpf(cpf){
    cpf.toString();
    resultado = 0;
    for (i = 10; i > 1; i--){
        resultado = cpf[10-i] * i; 
    };

    resultado = ((resultado*10)%11);
    
    if (resultado = 10){
        resultado = 0;
    }

    if (((resultado*10)%11) != cpf[9]){
        return false;
    };

    for (i = 11; i > 1; i--){
        resultado = cpf[11-i] * i; 
    };

    resultado = ((resultado*10)%11);
    
    if (resultado = 10){
        resultado = 0;
    }

    if (((resultado*10)%11) != cpf[9]){
        return false;
    };

    return true;

}

function validarNome(nome){
    const regex = /[0-9]/;
    if (regex.test(nome) == true){
        return false
    }

    return true;
}

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

function validarData(datanasc){ 
    let hoje = new Date();
    let nasc  = new Date(datanasc);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    let mes = hoje.getMonth() - nasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())){
        idade--;
    };

    if (idade > 100){
        document.getElementById("errodata").innerHTML = "Idade inválida!";
    };

    return true;
}

function validarTelefone(telefone){
    if (telefone.length > 11){
        document.getElementById("errotelefone").innerHTML = "Telefone Inválido";
    };
    return true;
}

function confirmarSenha(senha, confsenha){
    if (senha !== confsenha) {
        return false
    }

    return true;
}

function cadastrar(){
    nome = document.getElementById("nome");
    email = document.getElementById("email");
    datanasc = document.getElementById("datanasc");
    cpf = document.getElementById("cpf");
    senha = document.getElementById("senha");
    confsenha = document.getElementById("confsenha");
    telefone = document.getElementById("telefone");

    if(email.value =="" || senha.value =="" || confsenha.value ==""  ||  nome.value =="" || datanasc.value =="" || cpf.value =="" || telefone.value ==""){
        document.getElementById("errogeral").innerHTML = "Campos obrigatórios!";
        console.log('AEEEEEEEEEEEEE')
        return;
    }
    else {
        if (validarNome(nome.value) == false){
            document.getElementById("errogeral").innerHTML = "Campos obrigatórios!";
        };
        
        if (validacaoEmail(email.value) == false){
            document.getElementById("errogeral").innerHTML = "Campos obrigatórios!";
        };

        if (validarData(datanasc.value) == false){
            document.getElementById("errogeral").innerHTML = "Campos obrigatórios!";
        };

        if (validarcpf(cpf.value) == false){
            document.getElementById("errogeral").innerHTML = "Campos obrigatórios!";
        };

        if (validacaoSenha(senha) == false){
            document.getElementById("errogeral").innerHTML = "Campos obrigatórios!";
        };

        if (confirmarSenha(confsenha) == false){
            document.getElementById("errogeral").innerHTML = "Senha incompatível";
        };

        if (validarTelefone(telefone.value) == false){
            document.getElementById("errogeral").innerHTML = "Campos obrigatórios!"
        };

        return console.log('safe');
    };
};

function resetar(){
    "" = document.getElementById("nome");
    "" = document.getElementById("email");
    "" = document.getElementById("datanasc");
    "" = document.getElementById("cpf");
    "" = document.getElementById("senha");
    "" = document.getElementById("confsenha");
    "" = document.getElementById("telefone");
}