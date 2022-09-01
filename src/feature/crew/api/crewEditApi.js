import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';
import useAsyncSwr from 'hook/useAsyncSwr';
import {Async, safe, omit, getProp, setProp, not, ifElse, isEmpty, constant, map, option, chain, pipe, pick, objOf, mapProps} from 'crocks'
import {augmentToUser} from '../../../api/buildUserQuery';
import {createUseList, createUseOne, createUseWhereList, mapToNullableString} from 'api/buildApiHook';
import {useAuth} from 'context/auth';

const {Resolved, Rejected} = Async;

const mapOnActionIdentification = obj => ifElse(
  constant(obj?.id),
  pipe(
    map(e => ({...e, dislocation_zone_id: e?.crew_zone ? e?.crew_zone?.id : e?.dislocation_zone_id})),
    map(pipe(omit(['id', 'crew_zone'])))
  ),
  pipe(map(pipe(omit(['id']))),
    objOf('data')
  )
);

export const useCrews = createUseWhereList({
  graphQl: raw('./graphql/GetAllCrews.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected prop "crew" does not exist', getProp('crew'))
  )
});

export const useCrew = createUseOne({
  getGraphQl: raw('./graphql/CrewById.graphql'),
  createGraphql: raw('./graphql/CreateCrew.graphql'),
  updateGraphQl: raw('./graphql/UpdateCrewById.graphql'),
  deleteGraphQl: raw('./graphql/DeleteCrewById.graphql'),
  mapFromApiUsingAuth: true,
  asyncMapFromApi: auth => pipe(
    maybeToAsync('prop "crew_by_pk" was expected', getProp('crew_by_pk')),
    chain(
      obj => Async.of(obj => user => setProp('driver', user, obj))
        .ap(Async.of(obj))
        .ap(augmentToUser(auth, 'driver_user_id', obj))
    )
  ),
  asyncMapToApi: pipe(
    pick([
      'id',
      'name',
      'calendars',
      'abbreviation',
      'phone_number',
      'to_call_after',
      'is_assigned_automatically',
      'is_assigned_while_in_breaks',
    ]),
    obj =>
      mapProps({
        name: mapToNullableString,
        abbreviation: mapToNullableString,
        phone_number: mapToNullableString,
        to_call_after: mapToNullableString,
        calendars: mapOnActionIdentification(obj)
    }, obj),
    Resolved
  ),
  asyncRemoveMapToApi: pipe(pick(['id']), Resolved)
});

export const useCrewById = id => {
  const {api} = useAuth();
  const getSwr = useAsyncSwr([raw('./graphql/CrewById.graphql'), {id}], (query, params) => {
    api(params, query).chain(maybeToAsync('crew_by_pk prop was expected', getProp('crew_by_pk')))
  });

  return {
    ...getSwr
  };
};

export const useCrewZones = createUseList({
  graphQl: raw('./graphql/CrewZones.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('crew_zone prop was expected', getProp('crew_zone')),
    map(ifElse(isEmpty, () => [], map(a => ({key: a.name, value: a.id})))),
    safe(not(isEmpty)),
    option([])
  )
});


export const useCrewDropdown = createUseList({
  graphQl: raw('./graphql/GetAllCrews.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('crew prop was expected', getProp('crew')),
    map(ifElse(isEmpty, () => [], map(a => ({value: a.id, name: a.name})))),
    safe(not(isEmpty)),
    option([])
  ),
});
