import { FaSadTear } from "react-icons/fa";

export const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-xl text-center space-y-6">
        <FaSadTear className="mx-auto text-6xl text-red-500" />
        <h1 className="text-3xl font-semibold">申し訳ありません</h1>
        <p className="text-lg text-gray-700">
          システムエラーが発生しました。ご不便をおかけして申し訳ございません。
        </p>
        <p className="text-sm text-gray-500">
          エラー詳細: <span className="font-mono">{error.message}</span>
        </p>
        <div className="mt-4">
          <a
            href="/home"
            className="inline-block px-6 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition duration-300"
          >
            ホームに戻る
          </a>
        </div>
      </div>
    </div>
  );
};
