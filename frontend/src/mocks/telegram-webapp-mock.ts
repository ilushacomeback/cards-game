// src/mocks/telegram-webapp-mock.ts
import type { TelegramInitDataUnsafe } from '../telegram';

const MOCK_USER_ID = 123456789;
const MOCK_CHAT_ID = 987654321;

export const mockTelegram = () => {
  if (!window.Telegram) {
    const initDataUnsafe: TelegramInitDataUnsafe = {
      user: {
        id: MOCK_USER_ID,
        first_name: 'Dev',
        username: 'dev_user',
      },
      chat: {
        id: MOCK_CHAT_ID,
        type: 'private',
      },
      auth_date: Math.floor(Date.now() / 1000),
      hash: 'mock_hash',
    };

    const initData = JSON.stringify(initDataUnsafe); // простая строка для теста

    window.Telegram = {
      WebApp: {
        initData,
        initDataUnsafe,

        ready: () => console.log('[TG MOCK] WebApp ready'),
        close: () => console.log('[TG MOCK] WebApp close'),
        expand: () => console.log('[TG MOCK] WebApp expand'),

        colorScheme: 'light',
        platform: 'web',
      },
    };
  }
};
