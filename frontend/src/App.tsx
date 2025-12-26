import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      setTg(decodeURIComponent(tg.initData));
      const fn = async (initData: string) => {
        console.log('init data', JSON.stringify(initData));
        try {
          const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ initData }),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const payload = await res.json();

          if (!res.ok) {
            throw new Error(payload.message ?? 'Request failed');
          }
          console.log('success', payload);
        } catch (e) {
          console.error('error', e);
        }
      };
      fn(tg.initData);
    }
  }, [count]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Малыхин легенда</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {JSON.stringify(tg)}
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
