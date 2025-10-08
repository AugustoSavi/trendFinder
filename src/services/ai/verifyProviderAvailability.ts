import { Ollama } from "ollama";

/**
 * Checks provider availability before running the cron job.
 * If the provider is Ollama, ensures the model is downloaded and ready.
 * For other providers, it simply returns.
 */
export async function verifyProviderAvailability(
  intervalMs = 5000
): Promise<void> {
  const provider = process.env.AI_PROVIDER
  const model = process.env.OLLAMA_MODEL;
  if (!provider) throw new Error("No AI provider specified in environment variables.");
  if (provider.toLowerCase() !== "ollama") {
    console.log(`✅ Provider "${provider}" does not require verification.`);
    return;
  }

  if (!model) throw new Error("No Ollama model specified in environment variables.");
  const client = new Ollama({
    host: process.env.OLLAMA_BASE_URL,
  });

  let modelReady = false;
  while (!modelReady) {
    try {
      console.log(`🔎 Checking if Ollama model "${model}" is available...`);

      const availableModels = await client.list();
      modelReady = availableModels.models.some((m: any) => m.name === model);

      if (!modelReady) {
        console.log(`❌ Model "${model}" not found`);
      } else {
        console.log(`✅ Model "${model}" is ready.`);
      }
    } catch (error) {
      console.error("Error checking/pulling Ollama model:", error);
    }

    if (!modelReady) {
      console.log(`⏳ Waiting ${intervalMs / 1000}s before retrying...`);
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }
}
