import {lazy} from 'react';
import {getRoute} from 'util/react';

const ObjectRoute = getRoute(
  'feature.object.list',
  'object',
  lazy(() => import('./layout/list')),
  null
);

export default ObjectRoute;
