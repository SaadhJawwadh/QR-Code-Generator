
export interface QrCodeConfig {
  data: string;
  fgColor: string;
  bgColor: string;
  logo?: string; // base64 encoded image
  logoWidth: number;
  logoHeight: number;
  logoPadding: number;
}

export interface IQrCode extends QrCodeConfig {
  id: string;
  createdAt: string; // ISO string
}
