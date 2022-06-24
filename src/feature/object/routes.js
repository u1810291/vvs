import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

i18next.addResourceBundle('en', 'object', EN);
i18next.addResourceBundle('lt', 'object', LT);

export const ObjectEditRoute = getExactHiddenRoute('object', 'menu.edit', '/object/:id', lazy(() => import('./layout/ObjectEditLayout')), null);
export const ObjectListRoute = getExactRoute('object', 'menu.list', '/object', lazy(() => import('./layout/ObjectListLayout')), null);

const ObjectRoute = (
  <>
    {ObjectListRoute}
    {ObjectEditRoute}
  </>
);

export default ObjectRoute;
