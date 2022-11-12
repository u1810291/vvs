import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

i18next.addResourceBundle('en', 'request', EN);
i18next.addResourceBundle('lt', 'request', LT);

export const DislocationZoneActivityForecastNewRoute = getExactHiddenRoute(
  'request',
  'menu.edit',
  '/report/dislocation-zone-activity-forecast/new',
  lazy(() => import('./layout/RequestEditLayout')),
  null,
 ['admin', 'master_operator']
);

export const DislocationZoneActivityForecastEditRoute = getExactHiddenRoute(
  'request',
  'menu.edit',
  '/report/dislocation-zone-activity-forecast/:id',
  lazy(() => import('./layout/RequestEditLayout')),
  null,
 ['admin', 'master_operator']
);
export const DislocationZoneActivityForecastListRoute = getExactRoute(
  'request',
  'menu.list',
  '/report/dislocation-zone-activity-forecast',
  lazy(() => import('./layout/RequestListLayout')),
  null,
 ['admin', 'master_operator']
);

const DislocationZoneActivityForecastRoute = (
  <>
    {DislocationZoneActivityForecastListRoute}
    {DislocationZoneActivityForecastEditRoute}
    {DislocationZoneActivityForecastNewRoute}
  </>
);

export default DislocationZoneActivityForecastRoute;
