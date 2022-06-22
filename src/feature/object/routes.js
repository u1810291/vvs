import i18next from 'i18next';
import {lazy, Suspense} from 'react';
import {Route} from 'react-router-dom';
import {getExactHiddenRoute, getExactRoute, getHiddenRoute} from 'util/react';
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
