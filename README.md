# Gerenciador de Contatos
> Simplificando a criação e manutenção da sua lista de contatos.

## Tecnologias Utilizadas
- **Vite:** Ambiente de desenvolvimento.
- **React:** Construção de componentes.
- **React Router:** Facilita a navegação.
- **ContextAPI:** Compartilhamento de estado.
- **React Testing Library:** Assegurar funcionalidade correta.
- **TypeScript:** Tipagem para desenvolvimento mais robusto.
- **ESLint:** Verificação de sintaxe e padrões de código.
- **GitHub Pages:** Hospedagem de páginas estáticas.

## Instruções para rodar em Localhost
Para executar o Gerenciador de Contatos localmente, siga estas etapas:

1. **Pré-requisitos:** Verifique se o Node.js está instalado na sua máquina.
2. **Passos:**
   - Abra um terminal no diretório do projeto.
   - Execute `npm install` para instalar todas as dependências necessárias.
   - Após a instalação, use o comando `npm run dev` para iniciar o servidor de desenvolvimento.
3. Acesse a aplicação pela URL: [http://localhost:5173/](http://localhost:5173/).

## Aplicações dos fundamentos
- **Componentização:**
   - Componentes de ui (`src/components`) => Button e Input implementam "Composição de Componentes" para extender de forma centralizada as funcionalidades padrão, sendo reutilizáveis.
   - Componentes de apresentação (`src/pages`) => a página `CreateEditContact` é modular e se adapta aos dois formulários: criação e edição.
 
- **Roteamento:**
   - Utilizado o `browserRouter` padrão, com uma interface fixa composta pela Sidebar e o espaço em branco ao lado (Outlet). Todas as rotas são subrotas da raiz, e renderizam substituindo o Outlet.
  
- **Custom Hooks:** A aplicação conta com 2 hooks utilitários em `src/hooks`:
   - `useForm` => reúne os estados e lógica necessários (e repetitivos) para lidar com formulários
   - `useContactsAPI` => permite que componentes leiam e manipulem a lista de contatos sem conhecer a implementação

- **ContextAPI:**
   - Criado um contexto que reúne o estado global da aplicação e também as funções que permitem modificá-lo
   - Todos os componentes leem e escrevem direto no estado global, evitando *prop drilling*
   - Estrutura pronta para receber funcionalidades como pesquisa e ordenação

- **Estilização (CSS):**
   - CSS3 puro utilizado em toda a aplicação, utilizando-se das Propriedades de Dados do html para facilmente escolher entre variantes

## Bônus: Testes 🧪
Para rodar os testes, rode o comando:
`npm run test`
Ele rodará o utilitário `vitest` e reportará o resultado no console 
