# API Node.js + Express

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [Git](https://git-scm.com/)

## 1. Clonar o projeto

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Acesse a pasta do projeto:

```bash
cd NOME_DO_PROJETO
```

## 2. Instalar as dependências

Execute o comando abaixo para instalar todas as dependências necessárias:

```bash
npm install
```

O npm utilizará o arquivo `package.json` para instalar automaticamente os pacotes do projeto.

## 3. Configurar as variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado `.env`.

Utilize o arquivo `.env.example` como referência, copiando todos os seus campos para o novo arquivo `.env`.

**Todas as variáveis devem ser preenchidas corretamente**, principalmente as informações de conexão com o banco de dados.

Exemplo:

```env
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=

CORS_ORIGIN=

PORT=

SECRET_KEY=
PASS_AUTH=
USER_AUTH=
```

### Descrição das variáveis

| Variável | Descrição |
|---|---|
| `DB_HOST` | Endereço do servidor MySQL. |
| `DB_PORT` | Porta de conexão do MySQL (padrão: 3306). |
| `DB_NAME` | Nome do banco de dados. |
| `DB_USER` | Usuário de acesso ao MySQL. |
| `DB_PASS` | Senha de acesso ao MySQL. |
| `CORS_ORIGIN` | Origem autorizada a realizar requisições à API. |
| `PORT` | Porta em que a API será executada. |
| `SECRET_KEY` | Chave secreta utilizada na geração e validação de tokens JWT. |
| `PASS_AUTH` | Senha utilizada na autenticação configurada pela aplicação. |
| `USER_AUTH` | Usuário utilizado na autenticação configurada pela aplicação. |

**Importante:** não compartilhe o arquivo `.env` e não o envie para o repositório. Ele contém informações sensíveis da aplicação.

## 4. Criar o banco de dados MySQL

Antes de executar a API, é necessário criar manualmente o banco de dados através do MySQL Workbench.

Siga as instruções:

1. Abra o MySQL Workbench.
2. Conecte-se ao servidor MySQL.
3. Crie um novo banco de dados (Schema).
4. Utilize exatamente o mesmo nome informado na variável `DB_NAME` do arquivo `.env`.

**Atenção:** somente o banco de dados precisa ser criado manualmente. Não é necessário criar as tabelas individualmente.

O Sequelize será responsável por criar e sincronizar automaticamente as tabelas da aplicação durante a inicialização da API, desde que todas as configurações e associações estejam corretas.

## 5. Executar o projeto

Após concluir todas as configurações, execute:

```bash
npm run dev
```

Esse comando iniciará a API utilizando o Nodemon, permitindo que o servidor seja reiniciado automaticamente sempre que houver alterações nos arquivos monitorados.

Se todas as configurações estiverem corretas, o servidor será iniciado e estará pronto para receber requisições.

## Observações

- Certifique-se de que o servidor MySQL esteja em execução antes de iniciar a API.
- Verifique se todas as variáveis do `.env` foram preenchidas corretamente.
- Confirme se o banco de dados informado em `DB_NAME` existe.
- Em caso de erro na conexão, confira o host, a porta, o usuário e a senha do MySQL.
- Não crie as tabelas manualmente: essa responsabilidade é do Sequelize.

<hr>

# Documentação da API

Esta documentação apresenta os endpoints disponíveis na API para gerenciamento de usuários e categorias, incluindo seus métodos HTTP, descrições e parâmetros necessários para cada operação.

## 1. Usuários

Os endpoints de usuários permitem realizar operações de consulta, cadastro, atualização e exclusão de usuários.

### Endpoints

| Método HTTP | Endpoint | Descrição |
|---|---|---|
| GET | `/v1/user/:id` | Busca e exibe as informações de um usuário cadastrado. |
| POST | `/v1/user` | Cria um novo usuário. |
| PUT | `/v1/user/:id` | Atualiza os dados de um usuário cadastrado. |
| DELETE | `/v1/user/:id` | Exclui um usuário cadastrado. |

### Parâmetros

**GET `/v1/user/:id`**

- `id`: Identificador do usuário que será consultado.

**POST `/v1/user`**

Cria um novo usuário.

Parâmetros enviados no corpo (*body*) da requisição:

- `firstname`: Primeiro nome do usuário.
- `surname`: Sobrenome do usuário.
- `email`: E-mail do usuário.
- `password`: Senha do usuário.
- `confirmPassword`: Confirmação da senha do usuário.

**PUT `/v1/user/:id`**

Atualiza os dados de um usuário cadastrado.

Parâmetros:

- `id`: Identificador do usuário que será atualizado.
- `firstname`: Primeiro nome do usuário.
- `surname`: Sobrenome do usuário.
- `email`: E-mail do usuário.
- `password`: Nova senha do usuário.
- `confirmPassword`: Confirmação da nova senha.

**DELETE `/v1/user/:id`**

- `id`: Identificador do usuário que será excluído.

---

## 2. Categorias

Os endpoints de categorias permitem realizar operações de consulta, cadastro, atualização e exclusão de categorias.

### Endpoints

| Método HTTP | Endpoint | Descrição |
|---|---|---|
| GET | `/v1/category/:id` | Busca e exibe as informações de uma categoria cadastrada. |
| GET | `/v1/category/search` | Lista as categorias cadastradas, permitindo filtrar e paginar os resultados. |
| POST | `/v1/category` | Cria uma nova categoria. |
| PUT | `/v1/category/:id` | Atualiza os dados de uma categoria cadastrada. |
| DELETE | `/v1/category/:id` | Exclui uma categoria cadastrada. |

### Parâmetros

**GET `/v1/category/:id`**

- `id`: Identificador da categoria que será consultada.

**GET `/v1/category/search`**

Permite consultar as categorias cadastradas, com opções de paginação e filtragem.

Parâmetros de consulta (*query parameters*):

- `limit`: Quantidade de categorias exibidas por página. O valor `-1` exibe todas as categorias e é o valor padrão.
- `page`: Número da página dos resultados. Valor padrão: `1`.
- `fields`: Define quais campos da categoria serão exibidos.
- `use_in_menu`: Permite filtrar as categorias de acordo com sua exibição no menu.

**Exemplo de utilização:**

```http
GET /v1/category/search?limit=10&page=1&use_in_menu=true
```

**POST `/v1/category`**

Cria uma nova categoria.

Parâmetros enviados no corpo (*body*) da requisição:

- `name`: Nome da categoria.
- `slug`: Identificador textual da categoria utilizado na URL.
- `use_in_menu`: Define se a categoria será exibida no menu.

**PUT `/v1/category/:id`**

Atualiza os dados de uma categoria cadastrada.

Todos os parâmetros abaixo são obrigatórios na requisição:

- `id`: Identificador da categoria que será atualizada.
- `name`: Novo nome da categoria.
- `slug`: Novo identificador textual da categoria.
- `use_in_menu`: Define se a categoria será exibida no menu.

**DELETE `/v1/category/:id`**

- `id`: Identificador da categoria que será excluída.

---

## 3. Autenticação

Alguns endpoints exigem autenticação por token para permitir o acesso.

As seguintes rotas possuem proteção por autenticação:

| Método HTTP | Endpoint |
|---|---|
| PUT | `/v1/user/:id` |
| DELETE | `/v1/user/:id` |

Para acessar essas rotas, é necessário enviar um token válido na requisição.

---

## 4. Observações gerais

- Os parâmetros `:id` são informados diretamente na URL da requisição.
- Os parâmetros de consulta (`limit`, `page`, `fields` e `use_in_menu`) são enviados pela *query string*.
- Os dados de criação e atualização são enviados no corpo (*body*) da requisição.
- As rotas de atualização e exclusão de usuários exigem autenticação por token.
- As demais rotas listadas não possuem o middleware de autenticação indicado na configuração dos endpoints.

---

<blockquote>
    <em>
        Desenvolvido em conjunto por: 
        <a href="https://github.com/CacioDavi">Cácio Davi</a>, 
        <a href="https://github.com/Florentino2004">Tino Neto</a>,  e 
        <a href="https://github.com/DanielAlves21">Daniel Alves</a>
    </em>
    <p>
        Projeto por: 
        <a href="https://geracaotech.iel-ce.org.br">Geração Tech</a>
    </p>
</blockquote>
