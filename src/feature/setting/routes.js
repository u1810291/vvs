import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import {UserListRoute} from 'feature/user/routes';
import {TaskCancellationListRoute} from 'feature/classifier/routes';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'setting', EN);
i18next.addResourceBundle('lt', 'setting', LT);

export const SettingEditRoute = getExactHiddenRoute('setting', 'menu.edit', '/setting/:id', lazy(() => import('./layout/SettingEditLayout')), null);
export const SettingListRoute = getExactRoute('setting', 'menu.list', '/setting', lazy(() => import('./layout/SettingListLayout')), null);

const SettingRoute = (
  <>
    {SettingListRoute}
    {SettingEditRoute}
    {TaskCancellationListRoute}
    {UserListRoute}
  </>
);

export default SettingRoute;
