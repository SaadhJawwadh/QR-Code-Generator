import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { QrCodeForm } from './components/QrCodeForm';
import { QrCodeDisplay } from './components/QrCodeDisplay';
import { QrCodeList } from './components/QrCodeList';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { IQrCode, QrCodeConfig } from './types';
import { Save, X } from 'lucide-react';

const App: React.FC = () => {
  const [qrCodes, setQrCodes] = useLocalStorage<IQrCode[]>('qrCodes', []);
  const [currentQrConfig, setCurrentQrConfig] = useState<QrCodeConfig | null>(null);

  const handleGenerate = useCallback((config: QrCodeConfig) => {
    setCurrentQrConfig(config);
  }, []);

  const handleSave = useCallback(() => {
    if (currentQrConfig) {
      const newQrCode: IQrCode = {
        ...currentQrConfig,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setQrCodes(prev => [newQrCode, ...prev]);
      setCurrentQrConfig(null);
    }
  }, [currentQrConfig, setQrCodes]);
  
  const handleDelete = useCallback((id: string) => {
    setQrCodes(prev => prev.filter(qr => qr.id !== id));
  }, [setQrCodes]);

  const handleClearCurrent = useCallback(() => {
    setCurrentQrConfig(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-bold text-white mb-4">Create New QR Code</h2>
            <QrCodeForm onGenerate={handleGenerate} />
          </div>
          <div className="lg:col-span-8">
            {/* FIX: Corrected variable name from currentQrCodeConfig to currentQrConfig */}
            {currentQrConfig && (
              <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8 border border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">Preview</h3>
                  <button 
                    onClick={handleClearCurrent} 
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label="Clear Preview"
                  >
                    <X size={20}/>
                  </button>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-md">
                      {/* FIX: Corrected variable name from currentQrCodeConfig to currentQrConfig */}
                      <QrCodeDisplay config={currentQrConfig} size={256} />
                  </div>
                  {/* FIX: Corrected variable name from currentQrCodeConfig to currentQrConfig */}
                  <p className="text-center text-sm text-slate-400 mt-4 font-mono w-full truncate" title={currentQrConfig.data}>
                    {/* FIX: Corrected variable name from currentQrCodeConfig to currentQrConfig */}
                    {currentQrConfig.data}
                  </p>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full transition-colors"
                  >
                    <Save size={18} />
                    Save to Collection
                  </button>
                </div>
              </div>
            )}
            
            <h2 className="text-2xl font-bold text-white mb-4">My Collection</h2>
            <QrCodeList qrCodes={qrCodes} onDelete={handleDelete} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;