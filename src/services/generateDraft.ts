import { createAIProvider } from "./ai/aiFactory";

/**
 * Generate a post draft based on scraped raw stories.
 * If no items are found, a fallback message is returned.
 */
export async function generateDraft(rawStories: string) : Promise<boolean | string> {
  console.log(
    `Generating a post draft with raw stories (${rawStories.length} characters)...`,
  );

  try {

    const ai = createAIProvider();
    const currentDate = new Date().toLocaleDateString();
    const header = `🚀 AI and LLM Trends on X for ${currentDate}\n\n`;

    const rawJSON = await ai.generateResponse(rawStories);
    const parsed = JSON.parse(rawJSON);
    console.log("Parsed AI response:", parsed);

    const items = parsed.interestingTweetsOrStories || parsed.stories || [];

    console.log(`Found ${items.length} interesting items.`);

    if (items.length === 0) return false;

    // Build the draft post using the content array
    const draft_post =
      header +
      items
        .map(
          (item: any) =>
            `• ${item.description || item.headline}\n  ${
              item.story_or_tweet_link || item.link
            }`,
        )
        .join("\n\n");

    return draft_post;
  } catch (error) {
    console.error("Error generating draft post", error);
    return false;
  }
}
