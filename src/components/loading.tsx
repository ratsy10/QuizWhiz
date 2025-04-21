"use client";

import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-foreground">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;
