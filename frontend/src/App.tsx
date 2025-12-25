import { useTelegram } from './useTelegram';

function App() {
  const { tg, isLoading } = useTelegram();

  if (isLoading) {
    return (
      <div
        style={{
          padding: '50px',
          textAlign: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <h2>Loading Telegram Mini App...</h2>
        <p>Please wait</p>
      </div>
    );
  }

  if (!tg) {
    return (
      <div
        style={{
          padding: '20px',
          fontFamily: 'sans-serif',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ color: '#e74c3c' }}>⚠️ Telegram Mini App</h1>
        <p>This app only works inside Telegram.</p>

        <div
          style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            margin: '20px 0',
          }}
        >
          <h3>How to test:</h3>
          <ol>
            <li>
              Open <strong>Telegram app</strong> (not web.telegram.org)
            </li>
            <li>
              Find your bot: <code>@YourBotName</code>
            </li>
            <li>Click the Mini App button at the bottom</li>
          </ol>
        </div>

        <div
          style={{
            background: '#e8f4fd',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        >
          <h4>Debug Info:</h4>
          <p>
            <strong>URL:</strong> {window.location.href}
          </p>
          <p>
            <strong>Hash:</strong> {window.location.hash || 'empty'}
          </p>
          <p>
            <strong>In Telegram Web:</strong>{' '}
            {document.referrer.includes('web.telegram.org') ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>User Agent:</strong>{' '}
            {navigator.userAgent.includes('Telegram') ? 'Telegram detected' : 'Not Telegram'}
          </p>
        </div>
      </div>
    );
  }

  // Success! We're in Telegram
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: tg.themeParams.bg_color,
        color: tg.themeParams.text_color,
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>🎮 My Telegram App</h1>
      <p
        style={{
          background: tg.themeParams.button_color,
          color: tg.themeParams.button_text_color,
          padding: '10px',
          borderRadius: '5px',
          display: 'inline-block',
        }}
      >
        ✅ Connected to Telegram!
      </p>

      <div
        style={{
          marginTop: '30px',
          background: tg.themeParams.secondary_bg_color,
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h3>User Info:</h3>
        {tg.initDataUnsafe.user ? (
          <div>
            <p>
              <strong>ID:</strong> {tg.initDataUnsafe.user.id}
            </p>
            <p>
              <strong>Name:</strong> {tg.initDataUnsafe.user.first_name}
            </p>
            <p>
              <strong>Username:</strong> @{tg.initDataUnsafe.user.username}
            </p>
          </div>
        ) : (
          <p>No user data</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => {
            tg.sendData(JSON.stringify({ action: 'test' }));
          }}
          style={{
            background: tg.themeParams.button_color,
            color: tg.themeParams.button_text_color,
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Test Button
        </button>

        <button
          onClick={() => tg.close()}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Close App
        </button>
      </div>
    </div>
  );
}

export default App;
