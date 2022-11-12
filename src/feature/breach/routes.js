import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

// TODO: Adjust translations column names regarding response data
i18next.addResourceBundle('en', 'breach', EN);
i18next.addResourceBundle('lt', 'breach', LT);

export const BreachEditRoute = getExactHiddenRoute('breach', 'menu.edit', '/breach/:id', lazy(() => import('./layout/BreachEditLayout')), null, ['admin', 'master_operator', 'operator']);
export const BreachListRoute = getExactRoute('breach', 'menu.list', '/breach', lazy(() => import('./layout/BreachListLayout')), null, ['admin', 'master_operator', 'operator']);

const BreachRoute = (
  <>
    {BreachEditRoute}
  </>
);

export default BreachRoute;
