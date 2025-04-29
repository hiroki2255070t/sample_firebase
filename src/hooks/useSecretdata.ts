import { useState, useEffect } from "react";
import { getSecretData, getSecretList } from "../libs/firebase/firestore/secrets";

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
        console.log({ e });
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return { data, loading, error };
}

export function useSecretList() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getSecretList();
        setData(result);
      } catch (e) {
        console.log({ e });
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
}