import dotenv from "dotenv";
import { AIProvider } from "./providers/baseProvider";
import { OpenAIProvider } from "./providers/openaiProvider";
import { OllamaProvider } from "./providers/ollamaProvider";
import { TogetherProvider } from "./providers/togetherProvider";

dotenv.config();

export function createAIProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || "openai").toLowerCase();

  switch (provider) {
    case "ollama":
      return new OllamaProvider(
        process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
        process.env.OLLAMA_MODEL || "llama3"
      );

    case "together":
      return new TogetherProvider(process.env.TOGETHER_API_KEY || "");

    case "openai":
    default:
      return new OpenAIProvider(
        process.env.OPENAI_API_KEY || "",
        process.env.OPENAI_BASE_URL,
        process.env.OPENAI_MODEL || "gpt-4o-mini"
      );
  }
}
