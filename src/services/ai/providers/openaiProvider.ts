import OpenAI from "openai";
import { AIProvider } from "./baseProvider";
import { systemPrompt } from "../utils";

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, baseURL?: string, model = "gpt-4o-mini") {
    this.client = new OpenAI({ apiKey, baseURL });
    this.model = model;
  }

  async generateResponse(prompt: string): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        { role: "user", content: prompt },
      ],
    });
    return completion.choices[0].message.content ?? "";
  }
}
