# REACT-MUI-TYPESCRIPT

## Objetivo:
### Este projeto foi usado para minha aprimoração no react com typescript e outros recursos (Material UI, Axios, YUP...).

### Ele faz parte de um projeto full-stack, que se integra com uma API desenvolvida em NodeJs com TypeScript, que pode ser encontrada neste repositório: https://github.com/ViniGhiraldi/api-node-typescript

### Mais detalhes nas observações.

## Características do Projeto:
### Este projeto é capaz de realizar o CRUD com os campos de pessoas (com nome, sobrenome, email, cidadeId e id) e cidades (com nome e id). Possuí também autenticação, troca de tema, responsividade e recursos de listagem.

## Como executar:
### Após clonar o projeto, abra-o em seu terminal e digite o seguinte comando:
```
npm i
```
### Aguarde a conclusão da instalação das dependências e em seguida, execute:
```
npm start
```
### E pronto! Dentro de alguns instantes a aplicação estará rodando. O email e a senha cadastrados por padrão no banco serão informados na tela de login (leia as observações abaixo).

## Observações (importante):
### Este projeto utiliza de uma API externa para buscar os dados. Sem ela, não será possível passar da tela de login.

### A API se encontra no meu GitHub: https://github.com/ViniGhiraldi/api-node-typescript

### Na API há outro README.md com as instruções de como rodar ela em sua máquina.

## Detalhe:

### Na API o sqlite3 está sendo utilizado como banco de dados no ambiente de desenvolvimento, e ele não suporta a atribuição de valores default, então é necessário que uma opção chamada useNullAsDefault esteja habilitada. Devido a isso, pessoas que não possuem sobrenome cadastrado possuem a palavra "null" exibida depois de seu primeiro nome na tabela de pessoas.