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