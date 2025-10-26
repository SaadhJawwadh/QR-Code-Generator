import React, { useState } from 'react';
import type { QrCodeConfig } from '../types';
import { Image as ImageIcon, Send } from 'lucide-react';

interface QrCodeFormProps {
  onGenerate: (config: QrCodeConfig) => void;
}

export const QrCodeForm: React.FC<QrCodeFormProps> = ({ onGenerate }) => {
  const [data, setData] = useState<string>('https://gemini.google.com/');
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [logo, setLogo] = useState<string | undefined>();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      data,
      fgColor,
      bgColor,
      logo,
      logoWidth: 48,
      logoHeight: 48,
      logoPadding: 4,
    });
  };
  
  const InputLabel: React.FC<{htmlFor: string; children: React.ReactNode}> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-300 mb-2">{children}</label>
  );

  return (
    <form onSubmit={handleGenerate} className="space-y-6 bg-slate-800 p-6 rounded-lg border border-slate-700">
      <div>
        <InputLabel htmlFor="data">Data (URL or Text)</InputLabel>
        <textarea
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          rows={4}
          required
        />
      </div>

      <div>
        <h4 className="font-semibold text-slate-200 mb-3">Customization</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputLabel htmlFor="fgColor">Foreground</InputLabel>
            <input
              id="fgColor"
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full h-10 p-1 bg-slate-900 border border-slate-600 rounded-md cursor-pointer"
            />
          </div>
          <div>
            <InputLabel htmlFor="bgColor">Background</InputLabel>
            <input
              id="bgColor"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 p-1 bg-slate-900 border border-slate-600 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      <div>
        <InputLabel htmlFor="logo">Logo (optional)</InputLabel>
        <div className="mt-1 flex items-center gap-4">
            {logo && <img src={logo} alt="Logo preview" className="h-10 w-10 rounded-md object-cover bg-white p-1" />}
            <label className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-indigo-300 hover:text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-indigo-500 px-4 py-2 transition">
                <span>{logo ? 'Change logo' : 'Upload a file'}</span>
                <input id="logo" name="logo" type="file" className="sr-only" onChange={handleLogoUpload} accept="image/*" />
            </label>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
      >
        <Send size={18} />
        Generate QR Code
      </button>
    </form>
  );
};