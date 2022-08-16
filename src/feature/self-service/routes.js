import {lazy} from 'react';
import i18next from 'i18next';
import {getExactRoute} from 'util/react';

import {HelpListRoute} from 'feature/help/routes';
import {ClientListRoute} from 'feature/client/routes';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'selfservice', EN);
i18next.addResourceBundle('lt', 'selfservice', LT);

export const SelfServiceRouteListRoute = getExactRoute('selfservice', 'menu.list', '/self-service',  lazy(() => import('./layout/SelfServiceLayout')), null);

const SelfServiceRoute = (
  <>
    {SelfServiceRouteListRoute}
    {ClientListRoute}
    {HelpListRoute}
  </>
);

export default SelfServiceRoute;
