import raw from 'raw.macro';
import {
  createUseWhereList,
  createUseEnum,
  createUseOne,
  mapToNullableNumber,
  mapToString
} from 'api/buildApiHook';
import {
  map,
  mapProps,
  maybeToAsync,
  pipe,
  getProp,
  Async,
  pick,
} from 'crocks';

export const useObjects = createUseWhereList({
  graphQl: raw('./graphql/GetObjects.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "object" expected but not found.', getProp('object')),
  ),
})

export const useObject = createUseOne({
  getGraphQl: raw('./graphql/ObjectById.graphql'),
  createGraphql: raw('./graphql/CreateObject.graphql'),
  updateGraphQl: raw('./graphql/UpdateObjectById.graphql'),

  asyncMapFromApi: pipe(
    maybeToAsync('object_by_pk prop was expected', getProp('object_by_pk')),
    map(
      mapProps({
        longitude: mapToString,
        latitude: mapToString,
        provider_id: mapToString,
        navision_id: mapToString,
      })
    )
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
    ]),
    mapProps({
      navision_id: mapToNullableNumber,
      latitude: mapToNullableNumber,
      longitude: mapToNullableNumber,
    }),
    Async.Resolved
  ),
});

export const useCity = createUseEnum({
  graphQl: 'query { city { value } }',
  itemsProp: 'city',
  valueProp: 'value'
});
