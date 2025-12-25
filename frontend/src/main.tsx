import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// if (import.meta.env.DEV) {
//   import('./mocks/telegram-webapp-mock').then((mod) => mod.mockTelegram());
// }

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
);
