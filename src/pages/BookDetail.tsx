import { useEffect, useState } from "react";
import { MarkdownViewer } from "../components/MarkdownViewer";

const markdownModules = import.meta.glob("../../docs/books/*.md", {
  as: "raw",
});

export const BookDetail = ({ filename }: { filename: string }) => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    console.log({ filename });
    const filePath = `../../docs/books/${filename}`;
    const importer = markdownModules[filePath];
    if (importer) {
      importer().then((raw: string) => {
        setContent(raw);
      });
    } else {
      setContent(null);
    }
  }, [filename]);

  return (
    <>
      {content && (
        <div className="flex flex-col items-center justify-center h-full">
          <MarkdownViewer markdown={content} />
        </div>
      )}
      {!content && (
        <div className="flex flex-col items-center justify-center h-full">
          <p>書籍情報がありません</p>
        </div>
      )}
    </>
  );
};
