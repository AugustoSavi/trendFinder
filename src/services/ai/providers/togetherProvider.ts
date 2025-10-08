import Together from "together-ai";
import { AIProvider } from "./baseProvider";

export class TogetherProvider implements AIProvider {
  private client: any;
  private model: string;

  constructor(apiKey: string, model = "meta-llama/Llama-3-70b-chat-hf") {
    this.client = new Together({ apiKey });
    this.model = model;
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content ?? "";
  }
}
