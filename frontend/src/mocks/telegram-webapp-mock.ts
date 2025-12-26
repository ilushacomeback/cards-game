

const MOCK_USER_ID = 123456789;
const MOCK_CHAT_ID = 987654321;

export const mockTelegram = () => {
  if (!window.Telegram) {
    const initDataUnsafe = {
      user: {
        id: MOCK_USER_ID,
        first_name: 'Dev',
        username: 'dev_user',
      },
      chat: {
        id: MOCK_CHAT_ID,
        type: 'private',
        title: 'chatik',
      },
      auth_date: new Date(),
      hash: 'mock_hash',
      signature: 'sasasaa'
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
