🎬 Movie Recommendation MCP Server
Este é um servidor de Model Context Protocol (MCP) desenvolvido em Node.js e TypeScript. Ele permite que modelos de IA (como o Gemini ou Claude) acessem e gerenciem uma biblioteca local de filmes através de chamadas de função em tempo real.

O projeto demonstra a integração entre modelos de linguagem avançados (LLMs) e sistemas de arquivos locais, criando uma experiência de IA personalizada e contextualizada.

🛠️ Tecnologias Utilizadas
Node.js & TypeScript: Core do desenvolvimento e tipagem.

Google Generative AI SDK: Integração com o modelo Gemini 1.5 Flash.

Model Context Protocol (MCP): Protocolo de comunicação para ferramentas de IA.

Dotenv: Gerenciamento seguro de variáveis de ambiente.

✨ Funcionalidades
Busca Contextual: A IA identifica quais filmes da sua lista local você ainda não assistiu.

Filtragem Inteligente: Capacidade de filtrar recomendações por gênero ou nota.

Integração Local: Leitura e processamento de arquivos JSON locais de forma segura.

Extensível: Estrutura preparada para conexão com APIs externas (como TMDB).

🚀 Como Executar
Pré-requisitos
Node.js instalado (v18 ou superior)

Uma conta no Google AI Studio para obter sua API Key.

Instalação
Clone o repositório:

Bash
git clone https://github.com/andreifsa/meu-mcp-server.git
cd meu-mcp-server
Instale as dependências:

Bash
npm install
Configure suas variáveis de ambiente:
Crie um arquivo .env na raiz e adicione sua chave:

Snippet de código
GEMINI_API_KEY=sua_chave_aqui
Execução
Para rodar o servidor em modo de desenvolvimento:

Bash
npx ts-node src/gemini_mcp.ts

📂 Estrutura do Projeto

Plaintext
├── src/
│   ├── gemini_mcp.ts    # Integração Gemini + MCP
│   └── index.ts         # Servidor MCP base (Stdio)
├── filmes.json          # Banco de dados local (JSON)
├── .env                 # Chaves de API (não versionado)
└── tsconfig.json        # Configurações do TypeScript

📈 Próximos Passos
[ ] Implementar função para adicionar filmes via chat.

[ ] Integrar com a API do TMDB para sinopses em tempo real.

[ ] Criar testes unitários para a lógica de filtragem.