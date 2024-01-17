import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { SessionStorageProvider } from './components/SessionStorageProvider';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import { ThemeProvider } from './providers/themeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <SessionStorageProvider>
          <App />
        </SessionStorageProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
