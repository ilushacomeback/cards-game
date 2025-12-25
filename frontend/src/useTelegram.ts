// hooks/useTelegram.ts
import { useEffect, useState } from 'react';

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      username?: string;
      language_code?: string;
    };
  };
  platform: string;
  version: string;
  themeParams: Record<string, string>;
  expand: () => void;
  ready: () => void;
  close: () => void;
  sendData: (data: string) => void;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
}

export function useTelegram() {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = () => {
      // 1. Проверяем нативный Telegram объект (для мобильных/десктоп приложений)
      if (window.Telegram?.WebApp) {
        console.log('✅ Native Telegram WebApp detected');
        const webApp = window.Telegram.WebApp;

        // Расширяем на весь экран и говорим что готовы
        webApp.expand();
        webApp.ready();

        setTg(webApp);
        setIsLoading(false);
        return;
      }

      // 2. Проверяем данные в hash (для Telegram Web)
      if (window.location.hash.includes('tgWebAppData')) {
        console.log('🌐 Telegram Web version detected');
        const webApp = createTelegramMockFromHash();
        if (webApp) {
          setTg(webApp);
          setIsLoading(false);
          return;
        }
      }

      // 3. Не в Telegram среде
      console.log('❌ Not in Telegram environment');
      setIsLoading(false);
    };

    // Запускаем сразу
    init();

    // Дополнительная проверка через 500мс на случай если Telegram объект появится позже
    const timeoutId = setTimeout(() => {
      if (!tg && isLoading) {
        init(); // Повторная проверка
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return { tg, isLoading };
}

function createTelegramMockFromHash(): TelegramWebApp | null {
  try {
    // Парсим hash параметры
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const appData = params.get('tgWebAppData');
    if (!appData) return null;

    const dataParams = new URLSearchParams(appData);

    // Парсим пользователя
    const userStr = dataParams.get('user');
    let user = null;
    if (userStr) {
      try {
        user = JSON.parse(decodeURIComponent(userStr));
      } catch (e) {
        console.warn('Failed to parse user data:', e);
      }
    }

    // Парсим тему
    const themeStr = params.get('tgWebAppThemeParams');
    const defaultTheme = {
      bg_color: '#ffffff',
      text_color: '#000000',
      hint_color: '#707579',
      link_color: '#3390ec',
      button_color: '#3390ec',
      button_text_color: '#ffffff',
      secondary_bg_color: '#f4f4f5',
      header_bg_color: '#ffffff',
      accent_text_color: '#3390ec',
      section_bg_color: '#ffffff',
      section_header_text_color: '#707579',
      subtitle_text_color: '#707579',
      destructive_text_color: '#e53935',
    };

    let themeParams = { ...defaultTheme };
    if (themeStr) {
      try {
        themeParams = { ...themeParams, ...JSON.parse(decodeURIComponent(themeStr)) };
      } catch (e) {
        console.warn('Failed to parse theme:', e);
      }
    }

    return {
      initData: appData,
      initDataUnsafe: {
        user,
      },
      platform: params.get('tgWebAppPlatform') || 'web',
      version: params.get('tgWebAppVersion') || 'unknown',
      themeParams,
      expand: () => {
        console.log('Mock expand()');
        document.documentElement.style.height = '100vh';
      },
      ready: () => {
        console.log('Mock ready()');
        return true;
      },
      close: () => {
        console.log('Mock close()');
        // Пробуем закрыть окно если возможно
        if (window.history.length > 1) {
          window.history.back();
        } else if (window.opener) {
          window.close();
        } else {
          console.warn('Cannot close window programmatically');
        }
      },
      sendData: (data: string) => {
        console.log('Mock sendData():', data);
        alert('In real Telegram, this would send data to bot: ' + data);
      },
      isExpanded: true,
      viewportHeight: window.innerHeight,
      viewportStableHeight: window.innerHeight,
    };
  } catch (error) {
    console.error('Failed to create Telegram mock:', error);
    return null;
  }
}
