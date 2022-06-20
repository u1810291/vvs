import i18next from 'i18next';
import {lazy} from 'react';
import {getRoute} from 'util/react';
import EN from './i18n/en.json';

export const LOGIN_PAGE = 'login';

i18next.addResourceBundle('en', 'login', EN)

const LoginRoute = getRoute(
  'feature.login.main',
  LOGIN_PAGE,
  lazy(() => import('./layout/MainLoginLayout')),
  null,
  true
);

export default LoginRoute;