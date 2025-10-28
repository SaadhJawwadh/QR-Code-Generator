import React, { useState } from 'react';
import type { QrCodeConfig } from '../types';
import { Send, ImagePlus, X } from 'lucide-react';

interface QrCodeFormProps {
  onGenerate: (config: QrCodeConfig) => void;
}

const InputLabel: React.FC<{htmlFor: string; children: React.ReactNode}> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-300 mb-2">{children}</label>
);

const ColorInput: React.FC<{
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, id, value, onChange }) => (
  <div>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <div className="relative flex items-center bg-slate-900 border border-slate-600 rounded-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition">
       <div className="pl-3">
         <div 
          className="w-5 h-5 rounded-full border border-slate-500"
          style={{ backgroundColor: value }}
        />
      </div>
      <input
        id={id}
        type="text"
        value={value.toUpperCase()}
        onChange={onChange}
        className="w-full bg-transparent p-2 pl-2 text-white focus:outline-none font-mono"
        maxLength={7}
        pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
      />
      <input
        type="color"
        value={value}
        onChange={onChange}
        className="absolute top-0 left-0 w-8 h-full opacity-0 cursor-pointer"
        aria-label={`Select ${label} color`}
      />
    </div>
  </div>
);

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
          <ColorInput label="Foreground" id="fgColor" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
          <ColorInput label="Background" id="bgColor" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </div>
      </div>
      
      <div>
        <InputLabel htmlFor="logo-upload">Logo (optional)</InputLabel>
        <div className="flex items-center gap-4">
            <label className="relative cursor-pointer w-20 h-20 bg-slate-900 border-2 border-dashed border-slate-600 rounded-md flex items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-white transition">
                {logo ? (
                    <img src={logo} alt="Logo preview" className="w-full h-full object-contain rounded-md p-1" />
                ) : (
                    <ImagePlus size={32} />
                )}
                <input id="logo-upload" name="logo" type="file" className="sr-only" onChange={handleLogoUpload} accept="image/*" />
            </label>
            {logo && (
                <button
                    type="button"
                    onClick={() => {
                      setLogo(undefined);
                      const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
                      if (fileInput) fileInput.value = '';
                    }}
                    className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                    aria-label="Remove logo"
                >
                    <X size={20} />
                </button>
            )}
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-full transition-colors"
      >
        <Send size={18} />
        Generate QR Code
      </button>
    </form>
  );
};