import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'views/App';
import 'assets/styles/fonts.css';
import AppProviders from 'providers/AppProviders';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppProviders>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppProviders>
);

