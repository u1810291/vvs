import {lazy} from 'react';
import i18next from 'i18next';
import EN from './i18n/en.json';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

i18next.addResourceBundle('en', 'crew', EN);

export const CrewEditRoute = getExactHiddenRoute('crew', 'menu.edit', '/crew/:id', lazy(() => import('./layout/CrewEditLayout')), null);
export const CrewListRoute = getExactRoute('crew', 'menu.list', '/crew', lazy(() => import('./layout/CrewListLayout')), null);

const CrewRoute = (
  <>
    {CrewListRoute}
    {CrewEditRoute}
  </>
);

export default CrewRoute;
