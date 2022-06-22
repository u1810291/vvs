import i18next from 'i18next';
import {lazy} from 'react';
import {getExactHiddenRoute, getExactRoute} from 'util/react';
import EN from './i18n/en.json';

i18next.addResourceBundle('en', 'object', EN)

export const ObjectEditRoute = getExactHiddenRoute('object', 'menu.edit', '/object/:id', lazy(() => import('./layout/edit')), null);
export const ObjectListRoute = getExactRoute('object', 'menu.list', '/object', lazy(() => import('./layout/list')), null);

const ObjectRoute = (
  <>
    {ObjectListRoute}
    {ObjectEditRoute}
  </>
);

export default ObjectRoute;
