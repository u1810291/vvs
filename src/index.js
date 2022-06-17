import React, {Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {GlobalProvider} from './context/globalContext';

import App from './App';

import './i18n';
import './assets/tailwind.css';

const Root = createRoot(document.getElementById('root'));

Root.render(
  <React.StrictMode>
    <Suspense fallback={<div></div>}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Suspense>
  </React.StrictMode>
);
