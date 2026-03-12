import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import * as dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || ""); 

// 2. Definimos a "Função" (Tool) que o Gemini pode chamar
const movieTool = {
  functionDeclarations: [
    {
      name: "consultar_filmes_locais",
      description: "Lê a lista de filmes do usuário e retorna os que não foram vistos.",
      parameters: {
        type: "OBJECT",
        properties: {
          genero: { type: "STRING", description: "Gênero opcional" }
        }
      }
    }
  ]
};

// 3. A lógica real que acessa seu JSON
async function executarFerramenta(nome: string, args: any) {
  if (nome === "consultar_filmes_locais") {
    const dados = await fs.readFile("./filmes.json", "utf-16le"); // ou utf-8
    const filmes = JSON.parse(dados);
    return filmes.filter((f: any) => !f.visto);
  }
}

// 4. Execução do Chat
async function conversar() {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    tools: [movieTool as any],
  });

  const chat = model.startChat();
  const prompt = "Quais filmes da minha lista eu ainda não vi?";
  
  console.log("Usuário:", prompt);
  const result = await chat.sendMessage(prompt);
  
  // Se o Gemini decidir que precisa da ferramenta:
  const call = result.response.functionCalls()?.[0];
  if (call) {
    const toolResult = await executarFerramenta(call.name, call.args);
    const finalResult = await chat.sendMessage([{
      functionResponse: { name: call.name, response: { content: toolResult } }
    }]);
    console.log("Gemini:", finalResult.response.text());
  }
}

conversar();