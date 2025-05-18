import { generateEmbedding } from "../libs/huggingface/extractor";
import { DocumentEmbedding } from "../types/documentEmbedding";

const markdownModules = import.meta.glob("../../docs/*/*.md", {
  as: "raw",
});

export const generateDocumentEmbeddings = async (): Promise<
  DocumentEmbedding[]
> => {
  const entries = Object.entries(markdownModules);

  const results = await Promise.all(
    entries.map(async ([path, loadContent]) => {
      try {
        const content = await loadContent();
        const embedding = await generateEmbedding(content);
        return { path: path.replace("../../docs/", ""), embedding };
      } catch (error) {
        console.error(
          `Embedding failed for ${path.replace("../../docs/", "")}:`,
          error
        );
        return null;
      }
    })
  );

  const validResults: DocumentEmbedding[] = results.filter(
    (item): item is DocumentEmbedding => item !== null
  );

  return validResults;
};
