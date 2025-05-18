import { useState, useMemo } from "react";
import { Loading } from "../../components/Loading";
import { ErrorPage } from "../ErrorPage";
import { useBookList } from "../../hooks/useBooks";
import { Book } from "../../types/book";
import { BookDetail } from "./BookDetail";
import { RxCross1 } from "react-icons/rx";

function formatDateYM(dateStr: string): string {
  const [year, month] = dateStr.split("/").map(Number);
  return `${year}年${month}月`;
}

function dateToSortableValue(dateStr: string): number {
  const [year, month] = dateStr.split("/").map(Number);
  return year * 100 + month;
}

export const Books = () => {
  const { data, loading, error } = useBookList();

  const allTags = Array.from(new Set(data.flatMap((book) => book.tags)));
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const toggleTag = (tag: string) => {
    setFilterTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = data;
    if (filterTags.length > 0) {
      filtered = filtered.filter((book) =>
        filterTags.some((tag) => book.tags.includes(tag))
      );
    }
    return filtered.sort((a, b) => {
      const dateA = dateToSortableValue(a.dateRead);
      const dateB = dateToSortableValue(b.dateRead);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
  }, [data, filterTags, sortAsc]);

  if (loading) return <Loading></Loading>;
  if (error) return <ErrorPage error={error}></ErrorPage>;

  return (
    <div className="relative p-4 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">読んだ本リスト</h1>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded border border-gray-300 transition-colors ${
              filterTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setSortAsc(!sortAsc)}
        >
          日付でソート ({sortAsc ? "昇順" : "降順"})
        </button>
      </div>

      {filteredAndSortedBooks.map((book, index) => (
        <div
          key={index}
          className="border border-gray-100 rounded-lg p-4 transition-colors hover:bg-gray-100 cursor-pointer shadow-md"
          onClick={() => setSelectedBook(book)}
        >
          <div className="font-semibold text-xl mb-1">{book.title}</div>
          <div className="text-gray-700">著者: {book.author}</div>
          <div className="text-gray-700">
            読んだ日付: {formatDateYM(book.dateRead)}
          </div>
          <div className="text-gray-700">ISBN: {book.ISBN}</div>
          <div className="text-gray-700">タグ: {book.tags.join(", ")}</div>
        </div>
      ))}

      {selectedBook && (
        <div
          className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="relative w-3/4 max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 px-4 py-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedBook(null)}
            >
              <RxCross1 className="h-8 w-8" />
            </button>
            <div className="bg-white shadow-lg w-full h-[80vh] overflow-hidden rounded-lg">
              <div className="overflow-y-auto max-h-[calc(80vh-2.5rem)] p-4">
                <BookDetail ISBN={selectedBook.ISBN} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
