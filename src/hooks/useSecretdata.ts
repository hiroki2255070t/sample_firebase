// src/hooks/useSecretData.ts
import { useState, useEffect } from "react";
import { getSecretData } from "../libs/firebase/firestore";

export function useSecretData(id: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getSecretData(id);
        setData(result);
      } catch (e) {
        console.log({e})
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return { data, loading, error };
}
