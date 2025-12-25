import type { TelegramInitDataUnsafe } from '../telegram';

export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: TelegramInitDataUnsafe;
        ready: () => void;
        close: () => void;
        expand: () => void;
        colorScheme: 'light' | 'dark';
        platform: string;
      };
    };
  }
}
