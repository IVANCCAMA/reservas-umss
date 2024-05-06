import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/scss/stylesheet.scss';
import { store } from './redux/app/stores.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
