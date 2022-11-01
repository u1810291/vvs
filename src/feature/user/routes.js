import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'user', EN);
i18next.addResourceBundle('lt', 'user', LT);

export const UserEditRoute = getExactHiddenRoute('user', 'menu.edit', '/user/:id', lazy(() => import('./layout/UserEditLayout')), null);
export const UserListRoute = getExactRoute('user', 'menu.list', '/user',  lazy(() => import('./layout/UserListLayout')), null);

const UserRoute = (
  <>
    {UserListRoute}
    {UserEditRoute}
  </>
);

export default UserRoute;
