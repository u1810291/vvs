import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'client', EN);
i18next.addResourceBundle('lt', 'client', LT);

export const ClientEditRoute = getExactHiddenRoute('client', 'menu.edit', '/client/:id', lazy(() => import('./layout/ClientEditLayout')), null);
export const ClientListRoute = getExactRoute('client', 'menu.list', '/client', lazy(() => import('./layout/ClientListLayout')), null);

const ClientRoute = (
  <>
    {ClientEditRoute}
    {ClientListRoute}
  </>
);

export default ClientRoute;
