import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'user', EN);
i18next.addResourceBundle('lt', 'user', LT);


export const UserCreateRoute = getExactHiddenRoute('user', 'menu.create', '/user/new', lazy(() => import('./layout/UserEditLayout')), null, ['admin', 'master_operator']);
export const UserEditRoute = getExactHiddenRoute('user', 'menu.edit', '/user/:id', lazy(() => import('./layout/UserEditLayout')), null, ['admin', 'master_operator']);
export const UserListRoute = getExactRoute('user', 'menu.list', '/user',  lazy(() => import('./layout/UserListLayout')), null, ['admin', 'master_operator']);

const UserRoute = (
  <>
    {UserCreateRoute}
    {UserEditRoute}
  </>
);

export default UserRoute;
