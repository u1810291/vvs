import './assets/tailwind.css';
import './i18n';
import App from './App';
import GoogleContextProvider from 'context/googleApiContext';
import {StrictMode} from 'react';
import {GlobalProvider} from './context/globalContext';
import {createRoot} from 'react-dom/client';
import {AuthContextProvider} from 'context/auth';

const Root = createRoot(document.getElementById('root'));

Root.render(
  <StrictMode>
    <AuthContextProvider>
      <GoogleContextProvider>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </GoogleContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
