import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MarkdownViewer } from "../../components/MarkdownViewer";

const markdownModules = import.meta.glob("../../../docs/books/*.md", {
  as: "raw",
});

export const BookDetail = () => {
  const [content, setContent] = useState<string | null>(null);
  const ISBN = useParams().id || "";

  useEffect(() => {
    const filePath = `../../../docs/books/${ISBN}.md`;
    const importer = markdownModules[filePath];
    if (importer) {
      importer().then((raw: string) => {
        setContent(raw);
      });
    } else {
      setContent(null);
    }
  }, [ISBN]);

  return (
    <>
      {content && (
        <div className="flex flex-col items-center justify-center h-full">
          <MarkdownViewer markdown={content} />
        </div>
      )}
      {!content && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="p-4 py-8">
            <p>"{ISBN}"の書籍情報は現在用意されていません🙇</p>
          </div>
        </div>
      )}
    </>
  );
};
