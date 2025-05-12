import { FaSpinner } from 'react-icons/fa';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FaSpinner className="animate-spin text-blue-500 w-12 h-12" />
    </div>
  );
};
