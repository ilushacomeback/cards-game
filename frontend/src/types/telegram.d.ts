import type { InitData } from '@telegram-apps/init-data-node';

export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: InitData;
        ready: () => void;
        close: () => void;
        expand: () => void;
        colorScheme: 'light' | 'dark';
        platform: string;
      };
    };
  }
}
