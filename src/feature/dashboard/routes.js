import i18next from 'i18next';
import {lazy} from 'react';
import {getExactRoute} from 'util/react';
import EN from './i18n/en.json';

export const ROOT_PAGE = '/';

i18next.addResourceBundle('en', 'dashboard', EN);

const DashboardRoute = getExactRoute(
  'dashboard',
  'menu.main',
  ROOT_PAGE,
  lazy(() => import('./layout/DashboardLayout')),
  null
);

export default DashboardRoute;
