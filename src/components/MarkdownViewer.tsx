import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `
# 見出し1

これは **太字** のテキストです。

- リスト項目 1
    - sub
- リスト項目 2

1. first
2. second


[リンク](https://example.com)

| 見出し1 | 見出し2 |
|---------|---------|
| 内容1   | 内容2   |

- [x] 完了した項目
- [ ] 未完了の項目
`;

export const MarkdownViewer: React.FC = () => {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
