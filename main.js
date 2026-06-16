var API_URL = 'https://6a30923ca7f8866418d624b1.mockapi.io/almox-saude/materiais';

function carregarMateriais() {
    fetch(API_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (dados) {
            renderTabela(dados);
        });
}

document.getElementById('btn-cadastrar').addEventListener('click', function () {

    var nome = document.getElementById('input-nome').value;
    var quantidade = document.getElementById('input-quantidade').value;
    var unidade = document.getElementById('input-unidade').value;
    var msg = document.getElementById('mensagem');

    if (nome == '' || quantidade == '') {
        msg.className = 'erro';
        msg.style.display = 'block';
        msg.textContent = 'Preencha o nome e a quantidade antes de cadastrar.';
        return;
    }

    var novoMaterial = {
        nome: nome,
        quantidade: quantidade,
        unidade: unidade
    };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoMaterial)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function () {

            document.getElementById('input-nome').value = '';
            document.getElementById('input-quantidade').value = '';
            document.getElementById('input-unidade').value = '';

            msg.className = 'ok';
            msg.style.display = 'block';
            msg.textContent = nome + ' cadastrado com sucesso!';

            carregarMateriais();

        });

});

function renderTabela(materiais) {

  var tbody = document.getElementById('lista-materiais');
  tbody.innerHTML = '';

  if (materiais.length == 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty">Nenhum material cadastrado ainda.</td></tr>';
    return;
  }

  for (var i = 0; i < materiais.length; i++) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td>' + (i + 1) + '</td>' +
      '<td>' + materiais[i].nome + '</td>' +
      '<td>' + materiais[i].quantidade + '</td>' +
      '<td>' + materiais[i].unidade + '</td>' +
      '<td>' +
        '<input type="number" class="input-retirada" min="1" placeholder="Qtd">' +
        '<button class="btn-baixar" data-id="' + materiais[i].id + '">Baixar</button>' +
        '<button class="btn-excluir" data-id="' + materiais[i].id + '">Excluir</button>' +
      '</td>';
    tbody.appendChild(tr);
  }

}

carregarMateriais();