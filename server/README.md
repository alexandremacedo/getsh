<h1 align="center">
  <img alt="getsh" title="getsh" src="../.github/getsh-mustache-icon.png" width="200px" />
</h1>

<h3 align="center">
  Getsh server - Api for web and mobile applications
</h3>

<h4 align="center">
  NodeJS + Docker + Sequelize
</h4>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/AlexandreMacedoo/getsh?color=%2304D361">

  <a href="https://github.com/AlexandreMacedoo">
    <img alt="Made by Alexandre" src="https://img.shields.io/badge/made%20by-Alexandre-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/AlexandreMacedoo/getsh/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/AlexandreMacedoo/getsh?style=social">
  </a>
</p>

<p align="center">
  <a href="#pré-requisitos">Pré requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#endpoints">Endpoints</a>
</p>


# Getsh server
Getsh server - Api for web and mobile applications


## Pré requisitos

- Git (https://git-scm.com/)
- Yarn (https://yarnpkg.com/lang/en/)
- Node (https://nodejs.org/en/)
- Docker (https://www.docker.com/products/docker-desktop)

## Instalação
### Instalando as dependências
Com o projeto clonado em sua máquina, execute o comando abaixo:

```ssh
$ yarn
```
### Criando os containers
Com o docker instalado e rodando, execute os comandos abaixo:

```ssh
$ docker run --name postgres-getsh -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:11
$ docker run --name mongo-getsh -p 27017:27017 -d -t mongo
```
#### Para visualizar se os containers estão rodando, execute o comando:

```ssh
$ docker ps
```
### Rodando as migrations
Com os containers rodando, execute o comando:

```ssh
$ yarn sequelize db:migrate
```
### Executando
Após instalar todas as dependências, execute o comando:

```ssh
$ yarn dev
```
### Acesse a API
(http://localhost:3333/home)

## Endpoints
Routes:

Method | Endpoint | Controller | Action | Authentication
--- | --- | --- | --- | ---
POST   | /users                             | \src\app\controllers\UserController                   | store      | no
PUT    | /users                             | \src\app\controllers\UserController                   | update     | yes
POST   | /sessions                          | \src\app\controllers\SessionController                | store      | no
POST   | /files                             | \src\app\controllers\FileController                   | store      | yes
POST   | /photos                            | \src\app\controllers\PhotoController                  | store      | yes
GET    | /photos/:userId/userphotos         | \src\app\controllers\UserPhotoController              | index      | yes


## Consulte a documentação
- Documentação da API - EM BREVE
