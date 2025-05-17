import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MarkdownViewer } from "../../components/MarkdownViewer";

const markdownModules = import.meta.glob("../../docs/job/*.md", {
  as: "raw",
});

export const JobDetail = () => {
  const [content, setContent] = useState<string | null>(null);
  const id = useParams().id || "";

  useEffect(() => {
    const filePath = `../../docs/job/${id}.md`;
    const importer = markdownModules[filePath];
    if (importer) {
      importer().then((raw: string) => {
        setContent(raw);
      });
    } else {
      setContent(null);
    }
  }, [id]);

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
            <p>"{id}"のアルバイト・インターン情報は現在用意されていません🙇</p>
          </div>
        </div>
      )}
    </>
  );
};
