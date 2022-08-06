import raw from 'raw.macro';
import {useAuth} from 'context/auth';
import useAsyncSwr from 'hook/useAsyncSwr';
import {createUseList, createUseOne, mapToNullableString} from 'api/buildApiHook';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import {
  pipe,
  map,
  ifElse,
  isEmpty,
  getProp,
  pick,
  mapProps,
  Async, safe,
} from 'crocks'
import {option} from 'crocks/pointfree';
import {not} from 'crocks/logic';
import {tap} from 'crocks/helpers';

// TODO: Reduce duplicated requests

export const useCrews = createUseList({
  graphQl: raw('./graphql/Crews.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected prop "crew" does not exist', getProp('crew')),
  ),
});

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

export const useCrewById = id => {
  const {api} = useAuth();
  const getSwr = useAsyncSwr([raw('./graphql/CrewById.graphql'), {id}], (query, params) => (
    api(params, query).chain(maybeToAsync('crew_by_pk prop was expected', getProp('crew_by_pk')))
  ));

  return {
    ...getSwr
  }
};

export const useCrewZones = createUseList({
  graphQl: raw('./graphql/CrewZones.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('crew_zone prop was expected', getProp('crew_zone')),
    map(ifElse(isEmpty, () => [], map(a => ({key: a.name, value: a.id})))),
    tap(e => console.log(e.toString())),
    safe(not(isEmpty)),
    option([])
  ),
});
