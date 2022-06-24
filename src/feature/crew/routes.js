import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json'

i18next.addResourceBundle('en', 'crew', EN);
i18next.addResourceBundle('lt', 'crew', LT);

export const CrewEditRoute = getExactHiddenRoute('crew', 'menu.edit', '/crew/:id', lazy(() => import('./layout/CrewEditLayout')), null);
export const CrewListRoute = getExactRoute('crew', 'menu.list', '/crew', lazy(() => import('./layout/CrewListLayout')), null);

const CrewRoute = (
  <>
    {CrewListRoute}
    {CrewEditRoute}
  </>
);

export default CrewRoute;