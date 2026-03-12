import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";

const server = new Server(
  { name: "recomendador-filmes", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 1. Definição da Tool
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "sugerir_filme_fds",
      description: "Sugere um filme da lista local que o usuário ainda não assistiu",
      inputSchema: {
        type: "object",
        properties: {
          genero: { type: "string", description: "Gênero opcional para filtrar" }
        }
      },
    },
  ],
}));

// 2. Lógica para ler o arquivo local e sugerir
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "sugerir_filme_fds") {
    try {
      // Lendo o arquivo JSON local
      const dados = await fs.readFile(path.join(process.cwd(), "filmes.json"), "utf-8");
      const filmes = JSON.parse(dados);
      const generoDesejado = request.params.arguments?.genero;

      // Filtra: apenas filmes NÃO vistos e (se houver) do gênero escolhido
      const sugestoes = filmes.filter((f: any) => {
        const matchGenero = generoDesejado ? f.genero.toLowerCase() === (generoDesejado as string).toLowerCase() : true;
        return !f.visto && matchGenero;
      });

      if (sugestoes.length === 0) {
        return { content: [{ type: "text", text: "Você já viu tudo ou não tenho esse gênero na lista!" }] };
      }

      const listaTexto = sugestoes.map((f: any) => `- ${f.titulo} (${f.genero})`).join("\n");
      
      return {
        content: [{ type: "text", text: `Sugestões para seu fim de semana:\n${listaTexto}` }],
      };
    } catch (error) {
      return { content: [{ type: "text", text: "Erro ao ler lista de filmes local." }] };
    }
  }
  throw new Error("Tool não encontrada");
});

const transport = new StdioServerTransport();
await server.connect(transport);