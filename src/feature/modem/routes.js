import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'modem', EN);
i18next.addResourceBundle('lt', 'modem', LT);

export const ModemEditRoute = getExactHiddenRoute('modem', 'menu.edit', '/modem/:id', lazy(() => import('./layout/ModemEditLayout')), null, ['admin', 'master_operator']);
export const ModemListRoute = getExactRoute('modem', 'menu.list', '/modem', lazy(() => import('./layout/ModemListLayout')), null, ['admin', 'master_operator']);

const ModemRoute = (
  <>
    {ModemEditRoute}
  </>
);

export default ModemRoute;
