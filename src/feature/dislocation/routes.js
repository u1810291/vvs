import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

i18next.addResourceBundle('en', 'dislocation', EN);
i18next.addResourceBundle('lt', 'dislocation', LT);

export const DislocationListRoute = getExactRoute('dislocation', 'menu.list', '/dislocation', lazy(() => import('./layout/DislocationListLayout')), null);
export const DislocationCreateRoute = getExactHiddenRoute('dislocation', 'menu.create', '/dislocation/new', lazy(() => import('./layout/DislocationCreateLayout')), null);
export const DislocationEditRoute = getExactHiddenRoute('dislocation', 'menu.edit', '/dislocation/:id', lazy(() => import('./layout/DislocationEditLayout')), null);

const DislocationRoute = (
  <>
    {DislocationListRoute}
    {DislocationCreateRoute}
    {DislocationEditRoute}
  </>
);

export default DislocationRoute;
