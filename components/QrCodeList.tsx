
import React from 'react';
import type { IQrCode } from '../types';
import { QrCodeCard } from './QrCodeCard';

interface QrCodeListProps {
  qrCodes: IQrCode[];
  onDelete: (id: string) => void;
}

export const QrCodeList: React.FC<QrCodeListProps> = ({ qrCodes, onDelete }) => {
  if (qrCodes.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-800 rounded-lg border-2 border-dashed border-slate-700">
        <h3 className="text-lg font-medium text-slate-300">No Saved QR Codes</h3>
        <p className="text-slate-400 mt-1">Generate a QR code to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {qrCodes.map((qr) => (
        <QrCodeCard key={qr.id} qrCode={qr} onDelete={onDelete} />
      ))}
    </div>
  );
};
