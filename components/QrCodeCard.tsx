
import React, { useRef, useCallback, useState } from 'react';
import type { IQrCode } from '../types';
import { QrCodeDisplay } from './QrCodeDisplay';
import { toPng } from 'html-to-image';
import { Download, Trash2, Calendar, Clipboard, Check } from 'lucide-react';

interface QrCodeCardProps {
  qrCode: IQrCode;
  onDelete: (id: string) => void;
}

export const QrCodeCard: React.FC<QrCodeCardProps> = ({ qrCode, onDelete }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleDownload = useCallback(() => {
    if (qrRef.current === null) {
      return;
    }

    toPng(qrRef.current, { cacheBust: true, backgroundColor: qrCode.bgColor })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `qrcode-${qrCode.id.substring(0, 8)}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      });
  }, [qrCode]);

  const handleCopy = useCallback(() => {
    if (isCopied) return;
    navigator.clipboard.writeText(qrCode.data).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }, [qrCode.data, isCopied]);

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden flex flex-col transition-transform hover:transform hover:-translate-y-1 hover:shadow-indigo-500/20">
      <div className="p-4 bg-white flex justify-center items-center" ref={qrRef}>
        <QrCodeDisplay config={qrCode} size={200} />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-sm text-slate-300 font-mono break-all flex-grow truncate" title={qrCode.data}>
          {qrCode.data}
        </p>
        <div className="text-xs text-slate-500 flex items-center gap-2 mt-3">
            <Calendar size={14} />
            <span>Created: {new Date(qrCode.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="p-2 bg-slate-700/50 flex justify-end items-center gap-2">
        <button
          onClick={handleDownload}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          aria-label="Download QR Code"
        >
          <Download size={16} />
        </button>
        <button
          onClick={handleCopy}
          disabled={isCopied}
          className={`w-9 h-9 flex items-center justify-center rounded-full text-white transition-colors ${
            isCopied
              ? 'bg-green-600 cursor-default'
              : 'bg-slate-600 hover:bg-slate-500'
          }`}
          aria-label={isCopied ? 'Copied to clipboard' : 'Copy data to clipboard'}
        >
          {isCopied ? <Check size={16} /> : <Clipboard size={16} />}
        </button>
        <button
          onClick={() => onDelete(qrCode.id)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
          aria-label="Delete QR Code"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
