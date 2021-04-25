function mascaraTelefone(tel) {
  if(tel.length > 12) {
    const index = tel.search('-');
    if(index !== 8) return tel.substring(0, 13);

    tel = tel.substring(0, 8) + tel[9] + tel[8] + tel.substring(10, tel.length);
  }

  tel = tel.replace(/^(\D)$/, '');

  tel = tel.replace(/^(\d{2})$/g,"($1)");

  tel = tel.replace(/^(.{4})(\d{4})$/, "$1$2-")

  return tel;
}

function mascaraCpf(cpf) {
  if(cpf.length > 13) return cpf.substring(0, 13);

  cpf = cpf.replace(/\D/g,"");
  cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
  return cpf
}

function inputCpfMask(input) {
  input.value = mascaraCpf(input.value);
}

function inputTelMask(input) {
  input.value = mascaraTelefone(input.value);
}