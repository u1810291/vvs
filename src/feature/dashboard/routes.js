import {lazy} from 'react';
import i18next from 'i18next';
import {getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

export const ROOT_PAGE = '/';

i18next.addResourceBundle('en', 'dashboard', EN);
i18next.addResourceBundle('lt', 'dashboard', LT);

const DashboardRoute = getExactRoute(
  'dashboard',
  'menu.main',
  ROOT_PAGE,
  lazy(() => import('./layout/DashboardLayout')),
  null
);

export default DashboardRoute;
