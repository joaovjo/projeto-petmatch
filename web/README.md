# 🐾 PetMatch & Care

Sistema de adoção e cuidado animal.

## 🚀 Padrão de Commits
Seguindo as orientações, utilizaremos:
- `feat:` Funcionalidades novas.
- `fix:` Correção de bugs.
- `docs:` Alterações em documentação.

## 📂 Estrutura
- `/server`: Back-end
- `/web`: Front-end

### 📂 Back-end
- `/database`: configuração do Drizzle e conexão do banco
- `/repositories`: objetos de operações CRUD
- `/services`: lógica de negócio
- `/routes`: definição dos endpoints

Como executar o back-end:
1. Após fazer o git pull, abra o terminal na pasta `/server` e execute `bun install` para instalar as dependências do projeto
2. Execute o comando `docker-compose up -d` para subir o banco de dados já com alguns dados inseridos
3. Execute o comando `bun dev` para subir o servidor back-end

Para interromper a aplicação:
1. Pressione CTRL + C para derrubar o servidor back-end
2. Execute o comando `docker-compose down -v` para derrubar o banco de dados

## Endpoints
- `GET /api/pets`: buscar todos os pets com dados de listagem
- `GET /api/pets/{id}`: buscar um pet específico com todos os dados