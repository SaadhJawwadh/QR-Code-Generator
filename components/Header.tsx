
import React from 'react';
import { QrCode } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-md border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <QrCode className="text-indigo-400" size={32} />
          <h1 className="text-2xl font-bold text-white">QR Code Studio</h1>
        </div>
      </div>
    </header>
  );
};
