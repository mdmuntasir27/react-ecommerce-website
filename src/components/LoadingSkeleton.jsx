import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse flex flex-col h-full">
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/3 mb-2"></div>
      <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-4"></div>
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>
        <div className="h-9 bg-gray-200 rounded-xl w-28"></div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
