import './i18n';
import './assets/tailwind.css';

import App from './App';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {AuthContextProvider} from 'context/auth';
import GoogleContextProvider from 'context/google';

const Root = createRoot(document.getElementById('root'));

Root.render(
  <StrictMode>
    <AuthContextProvider>
      <GoogleContextProvider>
        <App />
      </GoogleContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
