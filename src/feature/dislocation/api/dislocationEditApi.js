import raw from 'raw.macro';

import {createUseOne, mapToNullableString} from 'api/buildApiHook';

import maybeToAsync from 'crocks/Async/maybeToAsync';
import {identity} from 'lodash/util';
import {Async, getProp, mapProps, pick, pipe} from 'crocks';

export const useDisclocation = createUseOne({
  getGraphQl: raw('./graphql/GetDislocationZoneById.graphql'),
  createGraphql: raw('./graphql/CreateDislocationZone.graphql'),
  updateGraphQl: raw('./graphql/UpdateDislocationZoneById.graphql'),
  deleteGraphQl: raw('./graphql/DeleteDislocationZoneById.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "crew_zone_by_pk" was expected', getProp('crew_zone_by_pk')),
  ),
  asyncMapToApi: pipe(
    pick([
      'id',
      'name',
      'nodes'
    ]),
    mapProps({
      id: mapToNullableString,
      name: mapToNullableString,
      nodes: identity,
    }),
    Async.Resolved
  ),
  asyncRemoveMapToApi: pipe(
    pick(['id']),
    Async.Resolved
  )
});
