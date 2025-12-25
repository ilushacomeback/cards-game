import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('telegramm, window.Telegram?.WebApp', window.Telegram);
      if (window.Telegram?.WebApp) {
        clearInterval(interval);
        const tg = window.Telegram.WebApp;
        tg.ready();
        setTg(JSON.stringify(tg));
      }
    }, 3000);
  }, [count]);

  useEffect(() => {
    console.log('Full window object:', window);
    console.log('Telegram object:', window.Telegram);
    alert(`Telegram object: ${window.Telegram}`);
    console.log('Location:', window.location.href);
    alert(`Location: ${window.location.href}`);
    console.log('Referrer:', document.referrer);
    alert(`Referrer: ${document.referrer}`);
    console.log('User agent:', navigator.userAgent);
    alert(`User agent: ${navigator.userAgent}`);

    // Проверяем, находимся ли мы в Telegram
    const isTelegram = /Telegram|WebApp/i.test(navigator.userAgent);
    alert(`Is Telegram? ${isTelegram}`);
    console.log('Is Telegram?', isTelegram);
  }, []);

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
      <h1>Vite + Reacыыt</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>{tg}</div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
