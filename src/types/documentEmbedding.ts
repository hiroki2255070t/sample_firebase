import { z } from "zod";

export const DocumentEmbeddingSchema = z.object({
  path: z.string(),
  embedding: z.array(z.number()),
});

export type DocumentEmbedding = z.infer<typeof DocumentEmbeddingSchema>;
