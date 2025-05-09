import { useState, useEffect } from "react";
import { getBookList } from "../libs/firebase/firestore/books";
import { Book } from "../types/book";

export const useBookList = () => {
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const bookList = await getBookList();
        setData(bookList);
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