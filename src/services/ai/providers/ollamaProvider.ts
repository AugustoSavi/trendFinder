import {Ollama} from "ollama" 

import { AIProvider } from "./baseProvider";
import { systemPrompt } from "../utils";

export class OllamaProvider implements AIProvider {
  private client: Ollama;
  private model: string;

  constructor(baseURL: string, model: string) {
    this.client = new Ollama({ host: baseURL });
    this.model = model;
  }

  async generateResponse(prompt: string): Promise<string> {
    const completion = await this.client.chat({
      model: this.model,
      format: {
        type: "object",
        properties: {
          interestingTweetsOrStories: {
            type: "array",
            items: {
              type: "object",
              properties: {
                description: { type: "string" },
                story_or_tweet_link: { type: "string" }
              },
              required: ["description", "story_or_tweet_link"]
            }
          }
        },
        required: ["interestingTweetsOrStories"]
      },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      stream: false,
      think: true
    });
    return completion.message?.content?.trim() ?? "";
  }
}
