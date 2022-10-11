import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'help', EN);
i18next.addResourceBundle('lt', 'help', LT);

export const HelpEditRoute = getExactHiddenRoute('help', 'menu.edit', '/help/:id', lazy(() => import('./layout/HelpEditLayout')), null);
export const HelpListRoute = getExactRoute('help', 'menu.list', '/helps', lazy(() => import('./layout/HelpListLayout')), null);

const HelpRoute = (
  <>
    {HelpEditRoute}
  </>
);

export default HelpRoute;
