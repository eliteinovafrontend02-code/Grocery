// src/LoadingState.jsx

import React from "react";

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin-slow mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-gray-600 font-light tracking-wide">Loading checkout...</p>
      </div>
    </div>
  );
};

export default LoadingState;