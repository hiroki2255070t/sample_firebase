import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Home Page</h1>

      <Link to="/history" className="text-blue-500 underline">
        経歴のページへ移動する
      </Link>
    </div>
  );
};
