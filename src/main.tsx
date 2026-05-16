import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root')!;

// In production every route is prerendered (vite-prerender-plugin), so we
// hydrate the existing DOM. In dev there's no SSR markup — fall back to
// client-only render.
if (import.meta.env.PROD) {
  ReactDOM.hydrateRoot(
    root,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
