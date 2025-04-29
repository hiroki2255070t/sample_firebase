import { useState, useEffect } from "react";
import { getHistoryList } from "../libs/firebase/firestore/history";
import { History } from "../types/history";

export function useHistoryList() {
  const [data, setData] = useState<History[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const historyList = await getHistoryList();
        setData(historyList);
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