import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import markdown from "../../docs/sample.md"

export const MarkdownViewer: React.FC = () => {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
