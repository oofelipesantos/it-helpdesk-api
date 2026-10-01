# IT Helpdesk API

API REST para gerenciamento de chamados de TI, desenvolvida para a disciplina de Desenvolvimento Back-End.

O sistema tem como objetivo centralizar o gerenciamento de chamados de suporte de TI, permitindo cadastrar usuários e acompanhar os chamados relacionados a cada usuário

O sistema permite cadastrar usuários e gerenciar chamados de suporte relacionados a esses usuários, utilizando uma API REST com persistência de dados em PostgreSQL através do Supabase.

## 👥 Integrantes

- Felipe Santos
- Lucas William


## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- Supabase
- PostgreSQL
- Git e GitHub
- Postman

## 📋 Funcionalidades

A API possui CRUD completo para as duas entidades do sistema:

### Usuários

- Criar usuário
- Listar usuários
- Buscar usuário por ID
- Atualizar usuário
- Excluir usuário

### Chamados

- Criar chamado
- Listar chamados
- Buscar chamado por ID
- Atualizar chamado
- Excluir chamado

Também foram implementadas validações básicas dos dados recebidos e tratamento de erros.

## 🗃️ Entidades

### User

Representa o usuário responsável pela abertura dos chamados.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Identificador único |
| `name` | VARCHAR | Nome do usuário |
| `email` | VARCHAR | E-mail do usuário |
| `department` | VARCHAR | Departamento do usuário |

### Ticket

Representa um chamado de suporte de TI.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Identificador único |
| `title` | VARCHAR | Título do chamado |
| `description` | TEXT | Descrição do problema |
| `priority` | VARCHAR | Prioridade do chamado |
| `status` | VARCHAR | Status do chamado |
| `user_id` | UUID | Usuário relacionado ao chamado |
| `created_at` | TIMESTAMP | Data de criação |

## 🔗 Relacionamento

Um usuário pode possuir vários chamados, enquanto cada chamado pertence a um único usuário.

```text
User 1 ───────── N Ticket
       user_id
```

O relacionamento é realizado através da chave estrangeira:

```text
tickets.user_id → users.id
```

A API também verifica se o usuário informado existe antes de criar ou atualizar um chamado.

## 📁 Estrutura do projeto

```text
src/
├── app.ts
├── server.ts
│
├── config/
│   └── supabase.ts
│
├── controllers/
│   ├── user.controller.ts
│   └── ticket.controller.ts
│
├── models/
│   ├── user.model.ts
│   └── ticket.model.ts
│
├── repositories/
│   ├── user.repository.ts
│   └── ticket.repository.ts
│
└── routes/
    ├── health.routes.ts
    ├── users.routes.ts
    └── tickets.routes.ts
```

### Organização

- **Models:** definem a estrutura dos dados das entidades.
- **Controllers:** recebem as requisições HTTP, realizam validações e retornam as respostas.
- **Repositories:** realizam as operações de acesso ao banco de dados.
- **Routes:** definem os endpoints disponíveis na API.
- **Config:** contém a configuração da conexão com o Supabase.
- **`app.ts`:** configura o Express e registra as rotas.
- **`server.ts`:** inicia o servidor.

## ⚙️ Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd it-helpdesk-api
```

Instale as dependências:

```bash
npm install
```

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
```

O arquivo `.env` não deve ser enviado para o GitHub.

Utilize o `.env.example` como referência:

```env
SUPABASE_URL=
SUPABASE_KEY=
```

## 🗄️ Banco de dados

O projeto utiliza PostgreSQL através do Supabase.

As tabelas principais são:

```text
users
tickets
```

O relacionamento entre elas é feito pela chave estrangeira `tickets.user_id`, que referencia `users.id`.

Estrutura das tabelas utilizada no Supabase/PostgreSQL:

```
create table users (
    id uuid primary key default gen_random_uuid(),
    name varchar(100) not null,
    email varchar(150) not null unique,
    department varchar(100) not null
);


create table tickets (
    id uuid primary key default gen_random_uuid(),
    title varchar(150) not null,
    description text not null,
    priority varchar(20) not null,
    status varchar(20) not null,
    user_id uuid not null,
    created_at timestamp with time zone default now(),

    constraint fk_ticket_user
        foreign key (user_id)
        references users(id)
        on delete cascade
);
```

## ▶️ Executando o projeto

Para iniciar o servidor em ambiente de desenvolvimento:

```bash
npm run dev
```

O servidor será executado na porta:

```text
3000
```

A API estará disponível em:

```text
http://localhost:3000
```

## 🔌 Endpoints

### Users

#### Criar usuário

```http
POST /users
```

Exemplo:

```json
{
    "name": "usuário teste",
    "email": "teste.ti@email.com",
    "department": "Desenvolvimento"
}
```

#### Listar usuários

```http
GET /users
```

#### Buscar usuário por ID

```http
GET /users/:id
```

#### Atualizar usuário

```http
PUT /users/:id
```

Exemplo:

```json
{
    "name": "usuário teste",
    "email": "teste.ti@email.com",
    "department": "Desenvolvimento"
}
```

#### Excluir usuário

```http
DELETE /users/:id
```

---

### Tickets

#### Criar chamado

```http
POST /tickets
```

Exemplo:

```json
{
    "title": "Computador não liga",
    "description": "O computador do setor financeiro não está iniciando.",
    "priority": "high",
    "status": "open",
    "user_id": "UUID_DO_USUARIO"
}
```

Valores aceitos para `priority`:

```text
low
medium
high
```

Valores aceitos para `status`:

```text
open
in_progress
closed
```

#### Listar chamados

```http
GET /tickets
```

#### Buscar chamado por ID

```http
GET /tickets/:id
```

#### Atualizar chamado

```http
PUT /tickets/:id
```

Exemplo:

```json
{
    "title": "Computador não inicia",
    "description": "Equipamento continua sem iniciar após reinicialização.",
    "priority": "medium",
    "status": "in_progress",
    "user_id": "UUID_DO_USUARIO"
}
```

#### Excluir chamado

```http
DELETE /tickets/:id
```

## 🩺 Health Check

Para verificar se a API está funcionando:

```http
GET /health
```

Resposta:

```json
{
    "message": "API OK"
}
```

## ⚠️ Validações e tratamento de erros

A API possui validações básicas para os dados recebidos.

Entre elas:

- Campos obrigatórios de usuários;
- Validação básica de e-mail;
- Campos obrigatórios de chamados;
- Validação de prioridade;
- Validação de status;
- Validação de IDs;
- Verificação da existência do usuário relacionado ao chamado.

A API utiliza códigos HTTP para indicar o resultado das operações, como:

- `200 OK` — operação realizada com sucesso;
- `201 Created` — recurso criado;
- `400 Bad Request` — dados inválidos;
- `404 Not Found` — recurso não encontrado;
- `500 Internal Server Error` — erro interno.

## 🛠️ Testes

Os endpoints foram testados utilizando o Postman, verificando operações de criação, consulta, atualização e exclusão das entidades, além das validações e do relacionamento entre usuários e chamados.

## 📚 Objetivo acadêmico

Projeto desenvolvido para a disciplina de Desenvolvimento Back-End, com o objetivo de aplicar conceitos de desenvolvimento de APIs REST, organização em camadas, persistência de dados, relacionamento entre entidades, validação e tratamento de erros.
