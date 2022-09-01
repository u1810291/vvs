import raw from 'raw.macro';
import {mPgIntervalToStr} from 'util/datetime';
import {removeFalsyFields} from 'util/obj';
import {augmentsToUsers} from 'api/buildUserQuery';
import {
  createUseEnum,
  createUseOne,
  createUseWhereList,
  mapToNullableNumber,
  mapToString
} from 'api/buildApiHook';
import {
  Async,
  chain,
  getProp,
  map,
  mapProps,
  maybeToAsync,
  option,
  pick,
  pipe,
  setProp,
} from 'crocks';

export const useObjects = createUseWhereList({
  graphQl: raw('./graphql/GetObjects.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "object" expected but not found.', getProp('object')),
    
  ),
})

export const useObject = createUseOne({
  getGraphQl: raw('./graphql/GetObject.graphql'),
  createGraphql: raw('./graphql/CreateObject.graphql'),
  updateGraphQl: raw('./graphql/UpdateObjectId.graphql'),
  mapFromApiUsingAuth: true,
  asyncMapFromApi: auth => pipe(
    maybeToAsync('object_by_pk prop was expected', getProp('object_by_pk')),
    map(mapProps({
      longitude: mapToString,
      latitude: mapToString,
      provider_id: mapToString,
      navision_id: mapToString,
      feedback_sla_time_in_min: mapToString,
      feedback_from: pipe(
        mPgIntervalToStr,
        map(({hours, minutes}) => `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`),
        option(''),
      ),
      feedback_until: pipe(
        mPgIntervalToStr,
        map(({hours, minutes}) => `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`),
        option(''),
      ),
    })),
    chain(obj => Async.of(obj => augmentedUsers => setProp('users', augmentedUsers, obj))
      .ap(Async.of(obj))
      .ap(augmentsToUsers(auth, getProp('user_id'), obj?.users))
    ),
  ),

  asyncMapToApi: pipe(
    pick([
      'id',
      'address',
      'city',
      'contract_no',
      'contract_object_no',
      'description',
      'is_atm',
      'latitude',
      'longitude',
      'name',
      'navision_id',
      'phone',
      'is_crew_autoasigned',
      'is_call_after_inspection',
      'feedback_from',
      'feedback_until',
      'feedback_sla_time_in_min',
    ]),
    mapProps({
      navision_id: mapToNullableNumber,
      feedback_sla_time_in_min: mapToNullableNumber,
      latitude: mapToNullableNumber,
      longitude: mapToNullableNumber,
    }),
    removeFalsyFields,
    Async.Resolved
  ),
});

export const useCity = createUseEnum({
  graphQl: 'query { city { value } }',
  itemsProp: 'city',
  valueProp: 'value'
});
