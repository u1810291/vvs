import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'key', EN);
i18next.addResourceBundle('lt', 'key', LT);

export const KeyEditRoute = getExactHiddenRoute('key', 'menu.edit', '/key/:id', lazy(() => import('./layout/KeyEditLayout')), null);
export const KeyListRoute = getExactRoute('key', 'menu.list', '/key', lazy(() => import('./layout/KeyListLayout')), null);

const KeyRoute = (
  <>
    {KeyEditRoute}
    {KeyListRoute}
  </>
);

export default KeyRoute;
