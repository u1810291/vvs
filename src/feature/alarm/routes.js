import {lazy} from 'react';
import i18next from 'i18next';
import {getExactRoute} from 'util/react';

import {TaskListRoute} from 'feature/task/routes';
import {BreachListRoute} from 'feature/breach/routes';
import {PermissionListRoute} from 'feature/permission/routes';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

i18next.addResourceBundle('en', 'alarm', EN);
i18next.addResourceBundle('lt', 'alarm', LT);

export const AlarmEditRoute = getExactRoute('alarm', 'menu.main', '/task/alarm', lazy(() => import('./layout/AlarmLayout')), null);

const AlarmRoute = (
  <>
    {AlarmEditRoute}
    {TaskListRoute}
    {PermissionListRoute}
    {BreachListRoute}
  </>
);

export default AlarmRoute;
