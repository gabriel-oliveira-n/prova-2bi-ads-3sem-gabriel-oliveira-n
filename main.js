var API_URL = 'https://6a30923ca7f8866418d624b1.mockapi.io/almox-saude/materiais';
var listaMateriais = [];

function validarRetirada(estoqueAtual, quantidadeRetirada) {

    if (quantidadeRetirada <= 0) {
        return false;
    }

    if (quantidadeRetirada > estoqueAtual) {
        return false;
    }

    return true;
}

function carregarMateriais() {
    fetch(API_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (dados) {
            renderTabela(dados);
        })
        .catch(function (erro) {
            console.error('Erro ao carregar materiais:', erro);
            alert('Não foi possível carregar os materiais. Verifique sua conexão.');
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
        })
        .catch(function (erro) {
            console.error('Erro ao cadastrar material:', erro);
            msg.className = 'erro';
            msg.style.display = 'block';
            msg.textContent = 'Erro ao conectar com a API. Tente novamente.';
        });

});

function renderTabela(materiais) {

    listaMateriais = materiais;

    var busca = document.getElementById('input-busca').value.toLowerCase();

    var filtrados = materiais.filter(function (item) {
        return item.nome.toLowerCase().includes(busca);
    });

    document.getElementById('total-itens').textContent = materiais.length;

    var tbody = document.getElementById('lista-materiais');
    tbody.innerHTML = '';

    if (filtrados.length == 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty">Nenhum material encontrado.</td></tr>';
        return;
    }

    for (var i = 0; i < filtrados.length; i++) {
        var tr = document.createElement('tr');

        if (filtrados[i].quantidade < 10) {
            tr.className = 'estoque-critico';
        }

        tr.innerHTML =
            '<td>' + (i + 1) + '</td>' +
            '<td>' + filtrados[i].nome + '</td>' +
            '<td>' + filtrados[i].quantidade + '</td>' +
            '<td>' + filtrados[i].unidade + '</td>' +
            '<td>' +
            '<input type="number" class="input-retirada" min="1" placeholder="Qtd">' +
            '<button class="btn-baixar" data-id="' + filtrados[i].id + '">Baixar</button>' +
            '<button class="btn-excluir" data-id="' + filtrados[i].id + '">Excluir</button>' +
            '</td>';

        tbody.appendChild(tr);
    }

}

carregarMateriais();

document.getElementById('lista-materiais').addEventListener('click', function (evento) {

    if (evento.target.classList.contains('btn-baixar')) {

        var id = evento.target.dataset.id;

        var material = listaMateriais.find(function (item) {
            return item.id == id;
        });

        var linha = evento.target.closest('tr');
        var input = linha.querySelector('.input-retirada');
        var quantidadeRetirada = parseInt(input.value);

        var valido = validarRetirada(material.quantidade, quantidadeRetirada);

        if (!valido) {
            alert('Quantidade inválida! Verifique se o valor não é negativo nem maior que o estoque atual (' + material.quantidade + ').');
            return;
        }

        var novaQuantidade = material.quantidade - quantidadeRetirada;

        fetch(API_URL + '/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantidade: novaQuantidade })
        })
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                carregarMateriais();
            })
            .catch(function (erro) {
                console.error('Erro ao atualizar material:', erro);
                alert('Não foi possível atualizar o estoque. Verifique sua conexão.');
            });

    }

    if (evento.target.classList.contains('btn-excluir')) {

        var id = evento.target.dataset.id;

        var confirmou = confirm('Tem certeza que deseja excluir este material?');

        if (!confirmou) {
            return;
        }

        fetch(API_URL + '/' + id, {
            method: 'DELETE'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                carregarMateriais();
            });

    }

});

document.getElementById('input-busca').addEventListener('input', function () {
    renderTabela(listaMateriais);
});