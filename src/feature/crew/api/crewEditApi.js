import {createUseList, createUseOne, mapToNullableString} from 'api/buildApiHook';
import raw from 'raw.macro';
import {
  pipe,
  map,
  ifElse,
  isEmpty,
  getProp,
  pick,
  mapProps,
  Async,
} from 'crocks'
import maybeToAsync from 'crocks/Async/maybeToAsync';

export const useCrew = createUseOne({
  getGraphQl: raw('./graphql/CrewById.graphql'),
  createGraphql: raw('./graphql/CreateCrew.graphql'),
  updateGraphQl: raw('./graphql/UpdateCrewById.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "crew_by_pk" was expected', getProp('crew_by_pk')),
  ),
  asyncMapToApi: pipe(
    pick([
      'id',
      'name',
      'status',
      'driver_name',
      'phone_number',
      'to_call_after',
      'is_assigned_automatically',
      'is_assigned_while_in_breaks',
    ]),
    mapProps({
      name: mapToNullableString,
      driver_name: mapToNullableString,
      phone_number: mapToNullableString,
      to_call_after: mapToNullableString,
      status: mapToNullableString,
    }),
    Async.Resolved
  ),
});

export const useCrewZones = createUseList({
  graphQl: raw('./graphql/CrewZones.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('crew_zone prop was expected', getProp('crew_zone')),
    map(ifElse(isEmpty, () => [], map(a => ({key: a.name, value: a.id})))),
  ),
})
