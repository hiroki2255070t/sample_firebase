import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownViewer = ({ markdown }: { markdown: string }) => {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
};
