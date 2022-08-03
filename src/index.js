import './i18n';
import './assets/tailwind.css';

import App from './App';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {AuthContextProvider} from 'context/auth';
import GoogleContextProvider from 'context/google';
import {NotificationContextProvider} from 'feature/ui-notifications/context';

const Root = createRoot(document.getElementById('root'));

Root.render(
  <StrictMode>
    <NotificationContextProvider>
      <AuthContextProvider>
        <GoogleContextProvider>
          <App />
        </GoogleContextProvider>
      </AuthContextProvider>
    </NotificationContextProvider>
  </StrictMode>
);
