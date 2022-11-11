import {lazy} from 'react';
import i18next from 'i18next';
import {getExactHiddenRoute, getExactRoute} from 'util/react';

import EN from './i18n/en.json';
import LT from './i18n/lt.json';

i18next.addResourceBundle('en', 'report', EN);
i18next.addResourceBundle('lt', 'report', LT);

export const DislocationZoneActivityForecastCreateRoute = getExactHiddenRoute(
  'report',
  'menu.create',
  '/report/dislocation-zone-activity-forecast/new',
  lazy(() => import('./layout/DislocationZoneActivityForecastEditLayout')),
  null,
  ['admin', 'master_operator']
);

export const DislocationZoneActivityForecastViewRoute = getExactHiddenRoute(
  'report',
  'menu.view',
  '/report/dislocation-zone-activity-forecast/:id',
  lazy(() => import('./layout/DislocationZoneActivityForecastEditLayout')),
  null,
  ['admin', 'master_operator']
);

export const DislocationZoneActivityForecastListRoute = getExactRoute(
  'report',
  'menu.list',
  '/report/dislocation-zone-activity-forecast/',
  lazy(() => import('./layout/DislocationZoneActivityForecastListLayout')),
  null,
  ['admin', 'master_operator']
);

const ReportRoutes = (
  <>
    {DislocationZoneActivityForecastCreateRoute}
    {DislocationZoneActivityForecastViewRoute}
    {DislocationZoneActivityForecastListRoute}
  </>
);

export default ReportRoutes;
