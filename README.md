# Projeto Tabela de Restaurantes

Este projeto é uma aplicação React que exibe uma tabela com informações sobre restaurantes. Ela se conecta ao Firebase para buscar os dados, e os exibe em uma tabela. A aplicação possui recursos como exibição de estado de carregamento, tratamento de erro para quando não houver dados, e suporte a mock de dados para testes.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Firebase**: Plataforma para backend, incluindo autenticação e banco de dados em tempo real.
- **Vitest**: Framework de testes para garantir que a aplicação esteja funcionando conforme o esperado.
- **React Testing Library**: Biblioteca para realizar testes em componentes React.
- **MUI**: Biblioteca de componentes de interface do usuário.

## Requisitos

- Node.js >= 16.x
- npm ou yarn ou pnpm

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/henriquebortoletto/foodhub.git
cd seu-repositorio
```

2. Instale as dependências:

```bash
npm install

# ou, se estiver usando pnpm
pnpm install

# ou, se estiver usando yarn
yarn install
```

## Instalação do Firebase

Crie um projeto no Firebase Console, e obtenha as credenciais necessárias para a configuração do Firebase.
Depois, crie um arquivo .env na raiz do projeto e adicione as credenciais do Firebase:

```bash
## env

REACT_APP_FIREBASE_API_KEY=seu-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=seu-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=seu-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=seu-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=seu-measurement-id
```

## Como Rodar o Projeto

Para iniciar o projeto em modo de desenvolvimento, utilize o seguinte comando:

```bash
npm run dev

# ou, se estiver usando yarn
yarn dev

# ou, se estiver usando pnpm
pnpm dev

Isso irá iniciar a aplicação no http://localhost:5173.
```

## Como Rodar os Testes

Este projeto utiliza o Vitest para realizar os testes. Para rodar os testes, use o comando:

```bash
npm test

# ou, se estiver usando yarn
yarn test

# ou, se estiver usando pnpm
pnpm test
```

## Exemplos de Testes

- [x] Testar os cabeçalhos da tabela: Verifica se os cabeçalhos da tabela de restaurantes estão sendo renderizados corretamente.
- [x] Testar estado de carregamento: Verifica se o estado de carregamento é exibido corretamente quando os dados ainda não foram carregados.
- [x] Testar mensagem de "Nenhum restaurante encontrado": Verifica se a mensagem correta é exibida quando não há dados no banco.
- [x] Testar exibição de dados: Verifica se os dados simulados do Firebase são exibidos corretamente na tabela.
