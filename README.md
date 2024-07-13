# Porta Níquel

## Índice
<!--ts-->
   * [Informações Gerais](#informações-gerais)
      * [Desenvolvedora](#desenvolvedora)
      * [Frameworks Utilizadas](#frameworks-utilizadas)
      * [Rotas](#rotas)
   * [Servindo o projeto](#servindo-o-projeto)
      * [Front](#2-para-o-front)
      * [Back](#3-para-o-back)
<!--te-->

## Informações Gerais
Tenha uma carteira digital de maneira fácil e prática!

<p align="center">
  <img src="https://github.com/adriellyb/sendMessage/blob/main/front/src/assets/print.png" />
</p>

Esta aplicação tem uma interface dinâmica na qual você pode consultar e adicionar todos os seus saldos e despesas para ter um melhor controle de seus gastos. Aqui você pode:

- Adicionar um novo saldo
- Adicionar despesas
- Excluir despesas
- Consultar histórico de saldos
- Consultar histórico de despesas
- Alterar informações do usuário

Futuramente, pretendo adicionar novas funcionalidades.

### Desenvolvedora

- [Adrielly Balbino](https://www.linkedin.com/in/adrielly-balbino/)

### Frameworks Utilizadas
- [Node JS](https://nodejs.org/en/)
- [React JS](https://react.dev/)

### Rotas

Na API, as entidades User, Saldos e Despesas possuem suas rotas seguindo o conceito e as regras da API Rest, ou seja, estas rotas estão associadas as funções para criação, atualização, leitura e exclusão (create, read, update, destroy) dos dados. Apesar do aplicativo não se utilizar de todas elas.

Para testar as rotas, a URL utilizada é `` http://localhost:3333/ ``. Caso haja dúvidas, no arquivo `` src\routes\routes.js `` estão todas desta aplicação.
  
## Servindo o projeto

### 1. Clonando o projeto

Primeiramente, é que você clone o repositório em sua máquina, por isso utilize o comando

```bash 
git clone https://github.com/adriellyb/porta-niquel.git
```

### 2. Para o front

Tanto para servir o front quanto o back corretamente, é necessário que você tenha instalado nas dependências de seu computador o [NodeJS](https://nodejs.org/en/download/).

Depois no terminal, escreva os comandos:

```bash
npm install
```

### 3. Para o back

No terminal:

- Após clonar o projeto, insira o seguinte comando para gerar o arquivo *package.json*:

```jsx
npm init
```

- Em seguida, atualize as dependências *Express, Sequelize e Dotenv* através do comando:

```jsx
npm install express sequelize dotenv --save
```

- Atualize também a dependência *sqlite3*

```jsx
npm install sqlite3 --save
```

- Crie o arquivo *.env* com o comando abaixo e configure-o:

```jsx
cp .env.example .env
```

- Certifique-se que as variáveis do arquivo *.env* estão exatamente como as seguintes:
    - PORT=3333
    - APP_URL=http://localhost:3333
    - DB_DATABASE=database.sqlite


- Depois migre as tabelas criadas para o banco de dados da seguinte forma:

```jsx
npm run migrate
```

- Para finalizar, sirva o projeto através do comando:

```jsx
npm start
```
