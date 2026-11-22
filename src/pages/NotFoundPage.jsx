import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto py-20 px-4 text-center">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-gray-900">404</h1>
        <h2 className="text-lg font-bold text-gray-800">Page Not Found</h2>
        <p className="text-gray-500 text-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
