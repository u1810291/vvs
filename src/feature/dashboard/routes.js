import {lazy} from 'react';
import i18next from 'i18next';
import {getExactRoute} from 'util/react';

import {TaskListRoute} from 'feature/task/routes';
import {BreachListRoute} from 'feature/breach/routes';
import {PermissionListRoute} from 'feature/permission/routes';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

i18next.addResourceBundle('en', 'dashboard', EN);
i18next.addResourceBundle('lt', 'dashboard', LT);

export const DashboardEditRoute = getExactRoute('dashboard', 'menu.main', '/', lazy(() => import('./layout/DashboardLayout')), null, ['admin', 'master_operator', 'operator']);

const DashboardRoute = (
  <>
    {DashboardEditRoute}
    {TaskListRoute}
    {PermissionListRoute}
    {BreachListRoute}
  </>
);

export default DashboardRoute;
