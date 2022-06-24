import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'dislocation', EN);
i18next.addResourceBundle('lt', 'dislocation', LT);

export const DislocationEditRoute = getExactHiddenRoute('dislocation', 'menu.edit', '/dislocation/:id', lazy(() => import('./layout/DislocationEditLayout')), null);
export const DislocationListRoute = getExactRoute('dislocation', 'menu.list', '/dislocation', lazy(() => import('./layout/DislocationListLayout')), null);

const DislocationRoute = (
  <>
    {DislocationEditRoute}
    {DislocationListRoute}
  </>
);

export default DislocationRoute;
