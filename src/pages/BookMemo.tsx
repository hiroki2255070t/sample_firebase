import { useEffect, useState } from "react";
import { MarkdownViewer } from "../components/MarkdownViewer";

const markdownModules = import.meta.glob("../../docs/*.md", { as: "raw" });

export const BookMemo = ({ filename }: { filename: string }) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const filePath = `../../docs/${filename}`;
    const importer = markdownModules[filePath];
    if (importer) {
      importer().then((raw: string) => {
        setContent(raw);
      });
    } else {
      setContent("ファイルが見つかりませんでした。");
    }
  }, [filename]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Books</h1>
      <MarkdownViewer markdown={content} />
    </div>
  );
};
