# REACT-MUI-TYPESCRIPT

## Objetivo:

### Este projeto foi usado para minha aprimoração em React com TypeScript e outros recursos (Material UI, Axios, YUP...).

### Ele faz parte de um projeto full-stack, que se integra com uma API desenvolvida em NodeJs com TypeScript, que pode ser encontrada neste repositório: https://github.com/ViniGhiraldi/api-node-typescript

## Características do Projeto:

### Este projeto tem por finalidade realizar o CRUD com as tabelas de pessoas e cidades. Possuí também autenticação via JWT, troca de tema, responsividade e recursos de listagem.

## Como executar:

### Após clonar o projeto, abra-o em seu terminal e digite o seguinte comando:
```
npm i
```
### ou
```
yarn
```
### Aguarde a conclusão da instalação das dependências e em seguida, execute:
```
npm start
```
### ou
```
yarn start
```
### E pronto! Dentro de alguns instantes a aplicação estará rodando. O email e a senha cadastrados por padrão no banco serão informados na tela de login.

## Observações:

### Este projeto utiliza de uma API externa para buscar os dados. Sem ela, não será possível passar da tela de login.

### A API se encontra aqui: https://github.com/ViniGhiraldi/api-node-typescript

### Nela há outro README.md com as instruções de como executa-la em sua máquina.

## Detalhe:

### Caso haja problema na execução do projeto, um dos motivos pode ser que a porta utilizada já esteja em uso, seja a desta aplicação (porta 3000) ou a da API (porta 3333). Para mudar a porta deste projeto para 3001 por exemplo, basta adicionar "env:PORT=3001" após o comando de inicialização. O comando fica como no exemplo a seguir:
```
npm start env:PORT=3001
```
### Se o problema for na porta da API, as instruções de como troca-lá está no README.md da mesma. Caso a altere, será preciso referencia-la aqui. No arquivo index.ts dentro da pasta environment, dentro de shared, altere os 4 últimos números para os mesmos da porta que você definiu na API.
