// var new_row = document.createElement('div');
// new_row.className = "aClassName";

window.addEventListener('load', function () {
  const element = document.getElementById('user-nome');
  // loggedPage.js put cookies as global scope
  element.innerHTML = JSON.parse(cookies.user).nome
})

function calculaIdade(data) {
  const hoje = new Date();
  const nasc  = new Date(data);

  const mes = hoje.getMonth() - nasc.getMonth();
  let idade = hoje.getFullYear() - nasc.getFullYear();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())){
      idade--;
  };

  return idade;
}

function renderData(rows) {
  const table1 = document.getElementById("tabela");

  table1.innerHTML = `
    <tr>
      <td>
        <table class="Home_table-header">
          <tr class="Home_table-header-row">
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="Home_table-body">
          <table id="dados">
          </table>  
        </div>
      </td>
    </tr>
  `;

  const table = document.getElementById("dados");

  if(rows.length === 0){
    alert("Nenhum usuário encontrado");
    return;
  }
  
  rows.forEach(row => {
    const tr = document.createElement("tr");
    tr.className = 'Home_table-body-row';

    const td = document.createElement("td");
    const text = document.createTextNode(row.nome);
    td.className = 'Home_table-body-cell';
    td.appendChild(text);
    
    const td2 = document.createElement("td");
    const text2 = document.createTextNode(row.email);
    td2.className = 'Home_table-body-cell';
    td2.appendChild(text2);

    const td3 = document.createElement("td");
    const text3 = document.createTextNode(calculaIdade(row.data_nasc));
    td3.className = 'Home_table-body-cell';
    td3.appendChild(text3);

    tr.appendChild(td);
    tr.appendChild(td2)
    tr.appendChild(td3)
    
    table.appendChild(tr);               
  });
}

function buscar() {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      switch (this.status) {
        case 200: 
          renderData(JSON.parse(this.responseText));
          break;
        case 400:
          alert(this.responseText);
          break;
        case 403:
          alert('Não autorizado');
          logout();
          break;
        default:
          res.statusCode = 500;
          res.end('Internal server error');
          break;
      }
    }
  };

  const nome = document.getElementById('ipt_nome').value;

  xhttp.open("GET", `usuarios?nome=${nome}`, true);

  xhttp.send();
}