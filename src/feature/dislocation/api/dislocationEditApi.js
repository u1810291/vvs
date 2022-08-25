import raw from 'raw.macro';

import {createUseOne, mapToNullableString, createUseList} from 'api/buildApiHook';

import maybeToAsync from 'crocks/Async/maybeToAsync';
import {identity} from 'lodash/util';
import {Async, getProp, mapProps, pick, pipe, map, ifElse, isEmpty, safe, not, option} from 'crocks';

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


export const useDislocationZonesDropdown = createUseList({
  graphQl: raw('./graphql/GetAllDislocationZones.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('crew_zone prop was expected', getProp('crew_zone')),
    map(ifElse(isEmpty, () => [], map(a => ({value: a.id, name: a.name})))),
    safe(not(isEmpty)),
    option([])
  ),
});