import i18next from 'i18next';
import {lazy} from 'react';
import {getRoute} from 'util/react';
import EN from './i18n/en.json';

i18next.addResourceBundle('en', 'object', EN)

const ObjectRoute = getRoute(
  'feature.object.list',
  'object',
  lazy(() => import('./layout/list')),
  null
);

export default ObjectRoute;
