# Barber Shop - Schedule App

Este repositório contém o código-fonte do **Barber Shop - Schedule App**, uma aplicação web para gerenciar agendamentos de serviços de barbearia.

## 📌 Sobre o Projeto

O **Barber Shop - Schedule App** é uma aplicação web desenvolvida para gerenciar agendamentos de serviços de barbearia ou outros serviços, permitindo operações como:

- Cadastro e gerenciamento de serviços.
- Cadastro e gerenciamento de usuários.
- Perfil de usuários.
- Registro de agendamentos.
- Autenticação de usuários.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/): Runtime JavaScript para back-end.
- [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática.
- [NestJS](https://nestjs.com/): Framework Node.js para construção de aplicações serverless e microservices.
- [Prisma](https://www.prisma.io/): ORM para banco de dados.
- [NestJS I18n](https://github.com/nestjs/i18n): Biblioteca para internacionalização.
- [Class Transformer](https://github.com/typestack/class-transformer): Biblioteca para conversão de classes.
- [Class Validator](https://github.com/typestack/class-validator): Biblioteca para validação de dados.
- [JWT](https://github.com/auth0/node-jsonwebtoken): Biblioteca para autenticação de usuários.
- [Jest](https://jestjs.io/): Framework de testes.



## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) versão 14 ou superior.
- 
- Um gerenciador de pacotes como npm ou yarn.


## 🔧 Instalação e Execução


1. **Instale as dependências:**
   ```bash
   npm install || yarn install

   ```

2. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   
    # Environment variables

    # System environment
    NODE_ENV="production"
    PORT="3002"
    FRONTEND_URL="http://localhost:3000"

    # JWT
    JWT_SECRET="aa01570a1102c2c3adf09cca59b15383ac86d253_your_secret_key"
    JWT_EXPIRES_IN="8h"

    # I18n
    FALLBACK_LANGUAGE="pt-BR"

    # Default user
    DEFAULT_USER="Administrador"
    DEFAULT_PASSWORD="admin"
    DEFAULT_EMAIL="admin@exemplo.com"
    
   ```

3. **Build o projeto:**
   ```bash
   npm run build || yarn build
   ```
4. **Rode as migrations:**
   ```bash
   npm run db:prisma:generate || yarn db:prisma:generate
   ```

6. **Rode as Seeds (Popula o banco de dados com dados iniciais):**
   ```bash
   npm run db:seed || yarn db:seed
   ```

5. **Inicie a aplicação:**
   ```bash
   npm run start || yarn start
   ```

 
 A aplicação estará disponível em `http://localhost:3002`. => OBS: A aplicação está configurada para rodar na porta configurada no arquivo `.env` (PORT="3002").


Este projeto foi desenvolvido por **Erick de Freitas Gonçalves** [Linkedin](https://www.linkedin.com/in/erick-freitas-048064134/).

### Preview 🎥

<h1 align="center">
  <video src="./global/preview.mp4" width="640" height="480" controls autoplay loop muted allowfullscreen/>
</h1>