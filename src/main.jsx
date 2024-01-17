import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { SessionStorageSocket } from './components/SessionStorageSocket';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import { ThemeProvider } from './providers/themeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <SessionStorageSocket>
          <App />
        </SessionStorageSocket>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
