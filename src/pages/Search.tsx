import { useEffect, useState } from "react";
import { useEmbedding } from "../hooks/useEmbedding";
import { Loading } from "../components/Loading";
import { ErrorPage } from "./ErrorPage";
import { generateDocumentEmbeddings } from "../function/generateDocumentEmbeddings";

function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (normA * normB);
}

export const Search = () => {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [topDocs, setTopDocs] = useState<string[]>([]);
  const [docLoading, setDocLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  const { data, loading, error } = useEmbedding({ text: debouncedText });

  useEffect(() => {
    const searchRelevantDocs = async () => {
      if (!data) return;

      setDocLoading(true);
      const documents = await generateDocumentEmbeddings();

      const scored = documents.map((doc) => ({
        path: doc.path,
        score: cosineSimilarity(data, doc.embedding),
      }));

      const top = scored
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((doc) => doc.path);

      setTopDocs(top);
      setDocLoading(false);
    };

    searchRelevantDocs();
  }, [data]);

  if (loading || docLoading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700"
        >
          キーワード検索
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="例: スポーツ, プログラミング, 論文の書き方に関する書籍"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>
        </div>
      </div>
      {debouncedText && (
        <>
          <h1 className="text-xl font-bold mb-4">
            "{debouncedText}" に関連するドキュメント:
          </h1>
          <ul className="list-disc ml-5 space-y-2">
            {topDocs.map((path, index) => (
              <li key={index}>{path}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
