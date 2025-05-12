import { Loading } from "../components/Loading";
import { ErrorPage } from "./ErrorPage";
import { useHistoryList } from "../hooks/useHistory";
import { History } from "../types/history";

const sortHistoryList = (historyList: History[]): History[] => {
  return historyList.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.month - b.month;
  });
};

const Event = ({ history }: { history: History }) => {
  return (
    <div className="bg-zinc-100 transition-colors shadow-md rounded-2xl p-4 flex justify-between items-center">
      <div className="w-1/3">
        <div className="text-xl font-semibold text-gray-800 w-1/2">
          {history.year}年
        </div>
        <div className="text-lg font-semibold text-gray-800 w-1/2">
          {history.month}月
        </div>
      </div>
      <div className="text-2xl text-gray-800 w-2/3">{history.event}</div>
    </div>
  );
};

export const HistoryPage = () => {
  const { data, loading, error } = useHistoryList();

  if (loading) return <Loading></Loading>;
  if (error) return <ErrorPage error={error}></ErrorPage>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">歴史</h1>
      <div className="w-2/3 max-w-2xl space-y-4">
        {sortHistoryList(data).map((item) => (
          <Event history={item}></Event>
        ))}
      </div>
    </div>
  );
};
