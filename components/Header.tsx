import React from 'react';

const AppLogo: React.FC = () => (
  <div className="grid grid-cols-2 gap-1 p-1 bg-slate-800 rounded-md">
    <div className="w-2.5 h-2.5 bg-indigo-400 rounded-sm"></div>
    <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
    <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
    <div className="w-2.5 h-2.5 bg-indigo-400 rounded-sm"></div>
  </div>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-md border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <AppLogo />
          <h1 className="text-2xl font-bold text-white">QR Code Studio</h1>
        </div>
      </div>
    </header>
  );
};