import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'permission', EN);
i18next.addResourceBundle('lt', 'permission', LT);

// export const PermissionCreateRoute = getExactHiddenRoute('permission', 'menu.create', '/permission/new', lazy(() => import('./layout/PermissionEditLayout')), null);
export const PermissionEditRoute = getExactHiddenRoute('permission', 'menu.edit', '/permission/:id', lazy(() => import('./layout/PermissionEditLayout')), null, ['admin', 'master_operator', 'operator']);
export const PermissionListRoute = getExactRoute('permission', 'menu.list', '/permission', lazy(() => import('./layout/PermissionListLayout')), null, ['admin', 'master_operator', 'operator']);

const PermissionRoute = (
  <>
    {/* {PermissionCreateRoute} */}
    {PermissionEditRoute}
  </>
);

export default PermissionRoute;
