
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import type { QrCodeConfig } from '../types';

interface QrCodeDisplayProps {
  config: QrCodeConfig;
  size?: number;
}

export const QrCodeDisplay: React.FC<QrCodeDisplayProps> = ({ config, size = 128 }) => {
  const { data, fgColor, bgColor, logo, logoWidth, logoHeight, logoPadding } = config;

  return (
    <QRCodeCanvas
      value={data}
      size={size}
      fgColor={fgColor}
      bgColor={bgColor}
      level={'H'} // High error correction for logo
      imageSettings={
        logo
          ? {
              src: logo,
              x: undefined,
              y: undefined,
              height: logoHeight,
              width: logoWidth,
              excavate: true,
            }
          : undefined
      }
    />
  );
};
