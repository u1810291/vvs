import {useAuth} from 'context/auth';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import resultToAsync from 'crocks/Async/resultToAsync';
import {useAsyncEffect} from 'hook/useAsync';
import {useMemo} from 'react';
import {
  Async,
  flip,
  not,
  isEmpty,
  option,
  chain,
  isString,
  pipe,
  propSatisfies,
  safe,
  identity,
  map,
  mapProps,
} from 'crocks';

const {Resolved, Rejected} = Async;

const QUERY_OBJECT_BY_ID = `
  query ObjectById ($id: uuid!) {
    object_by_pk(id: $id) {
      address
      city
      contract_no
      contract_object_no
      description
      id
      is_atm
      latitude
      longitude
      name
      navision_id
      phone
    }
  }
`;

export const useObject = (params) => {
  const {api} = useAuth();

  const query = useAsyncEffect(
    Async.of(v => q => api(v, q))
    .ap(maybeToAsync(
      '"id" prop required in the arg0',
      safe(propSatisfies('id', isString), params)
    ))
    .ap(Resolved(QUERY_OBJECT_BY_ID))
    .chain(identity),
    /*console.error,
    pipe(
      tap(console.log),
      getProp('object_by_pk'),
      map(mapProps({
        longitude: String,
        latitude: String,
      })),
      //map(setForm)
    ),*/
    [params],
  );

  const mutate = useMemo(() => pipe(
    resultToAsync,
    map(mapProps({
      latitude: pipe(
        safe(not(isEmpty)),
        map(Number),
        option(null),
      ),
      longitude: pipe(
        safe(not(isEmpty)),
        map(Number),
        option(null),
      ),
    })),
    chain(flip(api)(
      `
        mutation UpdateObject(
          $id: uuid!,
          $address: String = null,
          $city: city_enum = VILNIUS,
          $contract_no: String = null
          $description: String = null
          $contract_object_no: String = null,
          $is_atm: Boolean = false,
          $latitude: numeric = null,
          $longitude: numeric = null,
          $name: String = null,
          $navision_id: Int = null,
          $phone: String = null,
        ) {
          update_object_by_pk(_set: {address: $address, city: $city, contract_no: $contract_no, contract_object_no: $contract_object_no, description: $description, is_atm: $is_atm, latitude: $latitude, longitude: $longitude, name: $name, navision_id: $navision_id, phone: $phone}, pk_columns: {id: $id}) {
            address
            city
            contract_no
            contract_object_no
            description
            is_atm
            latitude
            longitude
            name
            navision_id
            phone
          }
        }
      `
    ))
  ), [api]);

  return {
    query,
    mutate,
  }
};
