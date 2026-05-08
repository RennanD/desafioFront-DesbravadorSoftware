# GitHub Explorer - Desafio Frontend Desbravador Software

Este projeto é uma aplicação de exploração do GitHub desenvolvida como parte do desafio técnico para a vaga de Desenvolvedor Frontend na **Desbravador Software**. A aplicação permite buscar usuários do GitHub, visualizar seus perfis, listar repositórios com paginação e explorar detalhes específicos de cada repositório, incluindo a renderização de seus arquivos README.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as melhores práticas e ferramentas modernas do ecossistema React:

-   **React 19**: Biblioteca principal para construção da interface.
-   **TypeScript**: Garantia de tipagem estática e maior segurança no desenvolvimento.
-   **Vite**: Build tool extremamente rápida para o desenvolvimento frontend.
-   **TanStack Query (v5)**: Gerenciamento de estado assíncrono, cache e sincronização de dados da API.
-   **Axios**: Cliente HTTP para consumo da API do GitHub.
-   **React Bootstrap**: Framework de componentes UI para um design responsivo e consistente.
-   **Lucide React**: Biblioteca de ícones modernos e leves.
-   **React Markdown**: Renderização de arquivos Markdown (README) diretamente na aplicação.
-   **Vitest & React Testing Library**: Suíte de testes unitários e de integração.
-   **Biome**: Ferramenta completa para linting e formatação de código.

---

## ✨ Funcionalidades

-   **Busca de Usuários**: Pesquise qualquer usuário do GitHub através de seu login.
-   **Perfil Detalhado**: Visualização de bio, seguidores, seguindo, e-mail e avatar.
-   **Lista de Repositórios**:
    -   Exibição de todos os repositórios públicos do usuário.
    -   Paginação robusta integrada à API de busca do GitHub.
    -   Ordenação automática por número de estrelas.
-   **Detalhes do Repositório**:
    -   Exibição de metadados (estrelas, linguagem, descrição).
    -   Busca e decodificação do arquivo README em tempo real.
    -   Renderização rica de Markdown.
-   **Tratamento de Erros**: Feedback visual claro para usuários ou repositórios não encontrados (404) utilizando componentes dedicados.

---

## 📦 Como Instalar e Rodar

Siga os passos abaixo para configurar o projeto localmente:

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (recomendado versão 18 ou superior)
-   [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

### Passo a Passo

1.  **Clonar o repositório**:
    ```bash
    git clone https://github.com/seu-usuario/desafioFront-DesbravadorSoftware.git
    cd desafioFront-DesbravadorSoftware
    ```

2.  **Instalar dependências**:
    ```bash
    npm install
    # ou se usar pnpm
    pnpm install
    ```

3.  **Configurar Variáveis de Ambiente**:
    Crie um arquivo `.env` na raiz do projeto (ou copie do `.env.example`):
    ```env
    VITE_API_URL=https://api.github.com
    ```

4.  **Rodar o servidor de desenvolvimento**:
    ```bash
    npm run dev
    # ou
    pnpm dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

---

## 🧪 Executando Testes

Para garantir a qualidade do código, você pode rodar os testes unitários e de integração:

```bash
npm run test
# ou
pnpm test
```

Para visualizar a cobertura de testes (se configurado) ou rodar em modo watch, utilize as flags do Vitest.

---

## 🛠️ Estrutura do Projeto

-   `src/components`: Componentes reutilizáveis (Header, ErrorMessage, User components).
-   `src/hooks`: Hooks customizados para abstração da lógica de dados (TanStack Query).
-   `src/pages`: Páginas da aplicação (Search, User Profile, Repository Details).
-   `src/lib`: Configurações de bibliotecas externas (Axios/API).
-   `src/test`: Utilitários e configurações globais para testes.desenvolvida.

---

Desenvolvido com ❤️ por **Rennan Oliveira** para o desafio **Desbravador Software**.
