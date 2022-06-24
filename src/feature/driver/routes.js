import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'driver', EN);
i18next.addResourceBundle('lt', 'driver', LT);

export const DriverEditRoute = getExactHiddenRoute('driver', 'menu.edit', '/driver/:id', lazy(() => import('./layout/DriverEditLayout')), null);
export const DriverListRoute = getExactRoute('driver', 'menu.list', '/driver', lazy(() => import('./layout/DriverListLayout')), null);

const DriverRoute = (
  <>
    {DriverEditRoute}
    {DriverListRoute}
  </>
);

export default DriverRoute;
