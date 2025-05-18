import { pipeline, env } from "@xenova/transformers";
env.allowLocalModels = false;

let extractor: any = null;
export async function initializeExtractor() {
  if (extractor) {
    console.log("Extractor has already initialized.");
    return;
  }
  if (!pipeline) {
    console.error("Pipeline is not found.");
    return;
  }

  const task = "feature-extraction";
  const model = "Xenova/all-MiniLM-L6-v2";

  extractor = await pipeline(task, model, { progress_callback: console.log });
  console.log("Extractor initialized!");
}

export async function generateEmbedding(
  text: string
): Promise<number[]> {
  if (!extractor) {
    console.log("Extractor is not initialized.");
    await initializeExtractor();
  }
  try {
    const output = await extractor!(text, {
      pooling: "mean",
      normalize: true,
    });
    return Array.from(output.data);
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Embedding generation failed.");
  }
}
