import { useEffect, useState } from "react";
import { generateEmbedding } from "../libs/huggingface/extractor";

export const useEmbedding = ({ text }: { text: string }) => {
  const [data, setData] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchEmbedding() {
      try {
        const embedding = await generateEmbedding(text);
        setData(embedding);
      } catch (e) {
        console.log({ e });
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmbedding();
  }, [text]);
  return { data, loading, error };
};
