import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'keybox', EN);
i18next.addResourceBundle('lt', 'keybox', LT);

export const KeyBoxEditRoute = getExactHiddenRoute('keybox', 'menu.edit', '/keybox/:id', lazy(() => import('./layout/KeyBoxEditLayout')), null, ['admin', 'master_operator']);
export const KeyBoxListRoute = getExactRoute('keybox', 'menu.list', '/keybox', lazy(() => import('./layout/KeyBoxListLayout')), null, ['admin', 'master_operator']);
export const KeyBoxCreateRoute = getExactHiddenRoute('keybox', 'menu.create', '/keybox/new', lazy(() => import('./layout/KeyBoxEditLayout')), null, ['admin', 'master_operator']);

const KeyBoxRoute = (
  <>
    {KeyBoxCreateRoute}
    {KeyBoxEditRoute}
  </>
);

export default KeyBoxRoute;
