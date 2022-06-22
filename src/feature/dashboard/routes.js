import i18next from 'i18next';
import {lazy} from 'react';
import {getRoute} from 'util/react';
import EN from './i18n/en.json';

export const ROOT_PAGE = '/';

i18next.addResourceBundle('en', 'dashboard', EN);

const ObjectRoute = getRoute(
  'dashboard',
  'menu.main',
  ROOT_PAGE,
  lazy(() => import('./layout/DashboardLayout')),
  null
);

export default ObjectRoute;
