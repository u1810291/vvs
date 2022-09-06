import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';
import {HelpListRoute} from '../help/routes';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'client', EN);
i18next.addResourceBundle('lt', 'client', LT);

export const ClientListRoute = getExactRoute('client', 'menu.list', '/client', lazy(() => import('./layout/ClientListLayout')), null);
export const ClientEditRoute = getExactHiddenRoute('client', 'menu.edit', '/client/:id', lazy(() => import('./layout/ClientEditLayout')), null);

const ClientRoute = (
  <>
    {ClientListRoute}
    {ClientEditRoute}
    {HelpListRoute}
  </>
);

export default ClientRoute;
