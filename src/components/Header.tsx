import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              My Homepage
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex space-x-4">
              <Link to="/home" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/history" className="text-gray-700 hover:text-gray-900">
                経歴
              </Link>
              <Link to="/books" className="text-gray-700 hover:text-gray-900">
                読んだ本
              </Link>
              <Link to="/hobby" className="text-gray-700 hover:text-gray-900">
                趣味
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/home"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/history"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
          >
            経歴
          </Link>
          <Link
            to="/books"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
          >
            読んだ本
          </Link>
          <Link
            to="/hobby"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
          >
            趣味
          </Link>
        </div>
      )}
    </header>
  );
};
