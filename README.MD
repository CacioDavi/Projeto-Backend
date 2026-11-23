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


Desenvolvido em conjunto por: Cácio Davi e Daniel Alves
Projeto por: Geração Tech
