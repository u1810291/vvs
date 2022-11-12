import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';
import {HelpListRoute} from '../help/routes';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'client', EN);
i18next.addResourceBundle('lt', 'client', LT);


export const ClientCreateRoute = getExactHiddenRoute('client', 'menu.create', '/client/new', lazy(() => import('./layout/ClientEditLayout')), null, ['admin', 'master_operator']);
export const ClientEditRoute = getExactHiddenRoute('client', 'menu.edit', '/client/:id', lazy(() => import('./layout/ClientEditLayout')), null, ['admin', 'master_operator']);
export const ClientListRoute = getExactRoute('client', 'menu.list', '/client', lazy(() => import('./layout/ClientListLayout')), null, ['admin', 'master_operator']);

const ClientRoute = (
  <>
    {ClientListRoute}
    {ClientCreateRoute}
    {ClientEditRoute}
    {HelpListRoute}
  </>
);

export default ClientRoute;
