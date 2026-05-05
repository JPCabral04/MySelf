# My Self API

API REST em Node.js com Fastify, Prisma, PostgreSQL e autenticação JWT. O projeto organiza os recursos em módulos de usuários, categorias, agenda, finanças e atividades, com Swagger disponível para documentação interativa.

## Stack

- Node.js
- Fastify
- Prisma
- PostgreSQL
- JWT com `@fastify/jwt`
- Swagger / Swagger UI
- bcrypt para hash de senha

## Funcionalidades

- Cadastro e login com JWT
- Proteção global das rotas com autenticação Bearer
- Documentação automática com Swagger
- CRUD para usuários, categorias, agenda, finanças e atividades
- Persistência em PostgreSQL via Prisma

## Estrutura do projeto

```text
src/
  controllers/
  middlewares/
  repositories/
  routers/
  schemas/
  server.ts
prisma/
  schema.prisma
  migrations/
generated/
  prisma/
docker-compose.yaml
```

## Pré-requisitos

- Node.js 20+ recomendado
- pnpm
- Docker e Docker Compose, caso queira subir o banco localmente

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com algo assim:

```env
DATABASE_URL="postgresql://thor:thor@localhost:5432/thor"
JWT_SECRET="coloque-um-segredo-forte-aqui"
```

Se estiver usando o banco do Docker Compose deste repositório, os dados padrão são:

- usuário: `thor`
- senha: `thor`
- banco: `thor`
- porta: `5432`

## Instalação

```bash
pnpm install
```

## Banco de dados

### 1. Subir o PostgreSQL com Docker

```bash
docker compose -f docker-compose.yaml up -d
```

### 2. Gerar o cliente Prisma

```bash
pnpm prisma generate
```

### 3. Aplicar as migrations

```bash
pnpm prisma migrate dev
```

Se quiser apenas sincronizar o schema no ambiente de desenvolvimento, essa é a forma recomendada.

## Executando o projeto

### Modo desenvolvimento

```bash
pnpm dev
```

A aplicação sobe em:

- API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/docs`

## Autenticação

A API usa JWT. Quase todas as rotas exigem token no header:

```http
Authorization: Bearer <token>
```

Rotas públicas:

- `POST /auth/register`
- `POST /auth/login`
- `/docs`

O restante das rotas é protegido por autenticação.

### Register

`POST /auth/register`

Exemplo de body:

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "passwordHash": "minha-senha"
}
```

### Login

`POST /auth/login`

Exemplo de body:

```json
{
  "email": "joao@email.com",
  "passwordHash": "minha-senha"
}
```

Resposta típica:

```json
{
  "user": {
    "id": "...",
    "name": "João Silva",
    "email": "joao@email.com"
  },
  "token": "<jwt>"
}
```

## Swagger

A documentação interativa está disponível em `/docs` e inclui suporte ao esquema Bearer JWT.

Para testar rotas protegidas no Swagger:

1. Abra `/docs`
2. Clique em `Authorize`
3. Cole o token no formato `Bearer <token>`
4. Execute as rotas normalmente

## Rotas principais

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Users

- `GET /users`
- `GET /users/:id`
- `GET /users/email/:email`
- `PUT /users/:id`
- `DELETE /users/:id`

### Categories

- `GET /categories`
- `GET /categories/:id`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

### Agenda

- `GET /agenda-items`
- `GET /agenda-items/:id`
- `POST /agenda-items`
- `PUT /agenda-items/:id`
- `DELETE /agenda-items/:id`

### Tasks

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

### Events

- `GET /events`
- `GET /events/:id`
- `POST /events`
- `PUT /events/:id`
- `DELETE /events/:id`

### Financial items

- `GET /financial-items`
- `GET /financial-items/:id`
- `POST /financial-items`
- `PUT /financial-items/:id`
- `DELETE /financial-items/:id`

### Transactions

- `GET /transactions`
- `GET /transactions/:id`
- `POST /transactions`
- `PUT /transactions/:id`
- `DELETE /transactions/:id`

### Goals

- `GET /goals`
- `GET /goals/:id`
- `POST /goals`
- `PUT /goals/:id`
- `DELETE /goals/:id`

### Investments

- `GET /investments`
- `GET /investments/:id`
- `POST /investments`
- `PUT /investments/:id`
- `DELETE /investments/:id`

### Activities

- `GET /activities`
- `GET /activities/:id`
- `POST /activities`
- `PUT /activities/:id`
- `DELETE /activities/:id`

### Habit modules

- `GET /habit-modules`
- `GET /habit-modules/:id`
- `POST /habit-modules`
- `PUT /habit-modules/:id`
- `DELETE /habit-modules/:id`

### Daily records

- `GET /daily-records`
- `GET /daily-records/:id`
- `POST /daily-records`
- `PUT /daily-records/:id`
- `DELETE /daily-records/:id`

## Prisma

O schema principal está em `prisma/schema.prisma` e o client gerado fica em `generated/prisma`.

Comandos úteis:

```bash
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma studio
```

## Docker

O arquivo `docker-compose.yaml` sobe apenas o PostgreSQL.

```bash
docker compose -f docker-compose.yaml up -d
```

Para derrubar o container:

```bash
docker compose -f docker-compose.yaml down
```

## Modelos do banco

O projeto trabalha com os seguintes grupos principais:

- `User`
- `Category`
- `AgendaItem`, `Task`, `Event`
- `FinancialItem`, `Transaction`, `Goal`, `Investment`
- `Activity`, `HabitModule`, `DailyRecord`

## Observações

- As senhas são salvas com hash bcrypt.
- As rotas privadas exigem JWT em todas as requisições, exceto autenticação e documentação.
- Se você alterar o schema do Prisma, rode `pnpm prisma generate` e a migration correspondente.
