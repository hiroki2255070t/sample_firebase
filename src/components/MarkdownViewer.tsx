import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownViewer = ({ markdown }: { markdown: string }) => {
  return (
    <div className="prose p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
};
