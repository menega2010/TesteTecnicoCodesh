## Documentação da API

Bem-vindo à documentação da API Fullstack Challenge 🏅 - Dictionary! Esta API oferece recursos para gerenciar usuários, favoritos e pesquisar definições de palavras.

## Estrutura da API

A API consiste nos seguintes recursos principais:

User: Gerencia operações relacionadas aos usuários, como registro, autenticação e recuperação de perfil.
Favorite: Permite aos usuários adicionar e remover palavras aos favoritos.
Dictionary: Fornece recursos para pesquisar definições de palavras.
Acesso à Documentação
Para visualizar a documentação completa da API e experimentar seus endpoints, acesse Swagger UI e insira o URL da especificação OpenAPI da API.

URL da especificação OpenAPI: URL_DA_ESPECIFICACAO_OPENAPI

## Endpoints Disponíveis

A seguir estão os principais endpoints da API:

## User

GET /user/me: Retorna o perfil do usuário autenticado.
GET /user/me/history: Retorna o histórico de pesquisa do usuário autenticado.
GET /user/me/favorites: Retorna as palavras favoritas do usuário autenticado.
POST /user-register: Registra um novo usuário na plataforma.
POST /user-validate: Autentica um usuário registrado.

## Favorite

POST /entries/en/:word/favorite: Adiciona uma palavra aos favoritos do usuário autenticado.
DELETE /entries/en/:word/unfavorite: Remove uma palavra dos favoritos do usuário autenticado.

## Dictionary

GET /entries/en: Pesquisa definições de palavras.
GET /entries/en/:word: Obtém detalhes sobre uma palavra específica.
Instalação e Configuração
Para executar a API localmente, siga estas etapas:

Clone este repositório para o seu ambiente local.
Instale as dependências do projeto executando npm install.
Configure as variáveis de ambiente, se necessário.
Inicie o servidor executando npm start.
A API estará disponível em http://localhost:PORTA.
Tecnologias Utilizadas
Node.js
Express.js
Prisma ORM
PostgreSQL
Swagger UI
OpenAPI 3.0
Autores
Seu Nome
Licença
Este projeto está licenciado sob a licença MIT - consulte o arquivo LICENSE.md para obter detalhes.
