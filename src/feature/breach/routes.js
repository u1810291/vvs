import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'breach', EN);
i18next.addResourceBundle('lt', 'breach', LT);

export const BreachEditRoute = getExactHiddenRoute('breach', 'menu.edit', '/breach/:id', lazy(() => import('./layout/BreachEditLayout')), null);
export const BreachListRoute = getExactRoute('breach', 'menu.list', '/breach', lazy(() => import('./layout/BreachListLayout')), null);

const BreachRoute = (
  <>
    {BreachEditRoute}
    {BreachListRoute}
  </>
);

export default BreachRoute;
