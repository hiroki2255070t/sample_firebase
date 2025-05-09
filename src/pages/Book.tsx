import { MarkdownViewer } from "../components/MarkdownViewer";

export const Book = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Books</h1>
        <MarkdownViewer />
      </div>
    </>
  );
};
