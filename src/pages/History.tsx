import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useHistoryList } from "../hooks/useHistory";
import { History } from "../types/history";

const sortHistoryList = (historyList: History[]): History[] => {
  return historyList.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.month - b.month;
  });
}

export const HistoryPage = () => {
  const { data, loading, error } = useHistoryList();

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">経歴</h1>

      <Link
        to="/home"
        className="flex items-center text-purple-600 hover:text-purple-800 mb-10"
      >
        <FaArrowLeft className="mr-2" />
        ホームに戻る
      </Link>

      <div className="w-2/3 max-w-2xl space-y-4">
        {sortHistoryList(data).map((item, index) => (
          <div
            key={index}
            className="bg-amber-100 hover:bg-amber-200 transition-colors duration-300 shadow-md rounded-2xl p-4 flex justify-between items-center"
          >
            <div className="w-1/3">
              <div className="text-xl font-semibold text-gray-800 w-1/2">
                {item.year}年
              </div>
              <div className="text-lg font-semibold text-gray-800 w-1/2">
                {item.month}月
              </div>
            </div>
            <div className="text-2xl text-gray-800 w-2/3">{item.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
