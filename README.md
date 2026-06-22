🌐 **Projeto no ar:** [Acessar sistema](https://gabriel-oliveira-n.github.io/prova-2bi-ads-3sem-gabriel-oliveira-n/)


## Documentação API MockAPI.io

Atualmente, o controle dos materiais do almoxarifado do curso técnico de
Enfermagem é realizado por meio de planilhas eletrônicas, o que pode dificultar
a organização e o gerenciamento das informações. Para melhorar esse
processo, será desenvolvido um sistema web utilizando HTML, CSS e
JavaScript, permitindo cadastrar, consultar, editar e excluir materiais de forma
mais prática.
Para o armazenamento dos dados será utilizada a plataforma MockAPI.io, uma
ferramenta que permite criar APIs REST sem a necessidade de configurar um
banco de dados próprio. A plataforma gera endpoints automaticamente e
armazena os dados em seus servidores, retornando as informações em
formato JSON.
No projeto, a MockAPI.io funcionará como um banco de dados virtual
responsável por armazenar os materiais de enfermagem e suas
movimentações. A comunicação entre a aplicação e a API será realizada
através dos métodos HTTP:
 GET: consulta registros cadastrados.
 POST: cria novos registros.
 PUT: atualiza registros existentes.
 DELETE: remove registros do sistema.
Serão criados dois recursos principais: /materiais, responsável pelo cadastro
dos itens do almoxarifado, e /movimentacoes, utilizado para registrar as
entradas e saídas de materiais. Dessa forma, o sistema substituirá o controle
realizado por planilhas, tornando o gerenciamento do estoque mais organizado,
eficiente e confiável.

## Sprint 1

## Estrutura do Projeto

almoxarifado-sprint1/
├── index.html      # Estrutura da página
├── style.css       # Estilização visual
└── script.js       # Lógica e comunicação com a API

## Endpoints da API

Base URL: https://6a30923ca7f8866418d624b1.mockapi.io/almox-saude

| Método | Endpoint          | Descrição                        |
|--------|-------------------|----------------------------------|
| GET    | /materiais        | Lista todos os materiais         |
| POST   | /materiais        | Cadastra um novo material        |
| PUT    | /materiais/:id    | Atualiza um material existente   |
| DELETE | /materiais/:id    | Remove um material               |
| GET    | /movimentacoes    | Lista todas as movimentações     |
| POST   | /movimentacoes    | Registra uma nova movimentação   |

## Como executar

1. Clone ou baixe os arquivos do projeto;
2. Abra a pasta no VS Code;
3. Instale a extensão Live Server;
4. Clique com o botão direito no index.html e selecione Open with Live Server.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- MockAPI.io

## Sprint 2

## Retirada e Exclusão de Materiais

Na Sprint 2 foi implementado o módulo de baixa de estoque (retirada) e exclusão
de materiais, com validação de quantidade e integração completa com o MockAPI.

### Funcionalidades adicionadas

- Campo de quantidade a retirar em cada linha da tabela (`input-retirada`)
- Botão de baixa de estoque (`btn-baixar`) — atualiza o material via PUT
- Botão de exclusão (`btn-excluir`) — remove o material via DELETE
- Função `validarRetirada(estoqueAtual, quantidadeRetirada)` que impede
  retiradas inválidas (valores negativos, zero ou maiores que o estoque atual)

### Observação técnica

O contrato original especificava `id="input-retirada"`. Como o campo de
retirada se repete em cada linha da tabela, e atributos `id` devem ser únicos
na página, optou-se por usar `class="input-retirada"` no lugar, seguindo a
mesma lógica recomendada para os botões `btn-baixar` e `btn-excluir`.

### Endpoints utilizados

| Método | Endpoint              | Descrição                          |
|--------|-----------------------|-------------------------------------|
| PUT    | /materiais/:id        | Atualiza a quantidade do material   |
| DELETE | /materiais/:id        | Remove o material do estoque        |

### Testes da função validarRetirada

| Estoque atual | Quantidade retirada | Resultado esperado |
|---------------|----------------------|----------------------|
| 10            | 3                     | true                 |
| 5             | 5                     | true                 |
| 5             | 10                    | false                |
| 10            | -2                    | false                |
| 10            | 0                     | false                |
| 0             | 1                     | false                |

## Sprint 3

# Busca, Alertas e Deploy

Finalização do sistema com barra de pesquisa, alertas visuais de estoque
baixo, tratamento de erros de conexão e publicação do projeto na nuvem.

## O que foi feito

- Barra de pesquisa (`input-busca`) que filtra a tabela em tempo real
- Contador de itens (`total-itens`) exibido no cabeçalho da tabela
- Linhas com estoque menor que 10 recebem a classe `estoque-critico` (fundo vermelho)
- Tratamento de erros com `.catch()` em todos os fetches
- Deploy do projeto via GitHub Pages


## Endpoints utilizados

| Método | Endpoint        | Descrição                       |
|--------|-----------------|-----------------------------------|
| GET    | /materiais      | Lista e filtra os materiais       |
| POST   | /materiais      | Cadastra um novo material         |
| PUT    | /materiais/:id  | Atualiza a quantidade do material |
| DELETE | /materiais/:id  | Remove o material do estoque      |

## Autor

Gabriel Oliveira