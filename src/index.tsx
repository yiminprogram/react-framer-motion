import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './themes/global.scss';
import { HashRouter } from 'react-router-dom';

render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.querySelector('#root'),
);
