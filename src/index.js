import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './assets/tailwind.css';
import App from './App';
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div></div>}>
    <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
