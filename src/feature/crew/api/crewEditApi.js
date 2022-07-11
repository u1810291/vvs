import raw from 'raw.macro';

import {useAuth} from 'context/auth';
import useAsyncSwr from 'hook/useAsyncSwr';

import {either} from 'crocks/pointfree';
import {getProp, maybeToAsync, pipe, chain, safe, isEmpty, not, map} from 'crocks';

export const useCrew = (id) => {
  const {api} = useAuth();
  const getSwr = useAsyncSwr([raw('./graphql/CrewById.graphql'), {id}], (query, params) => (
    api(params, query).chain(maybeToAsync('crew_by_pk prop was expected', getProp('crew_by_pk')))
  ));

  return {
    ...getSwr
  }
};

export const useCrewZones = () => {
  const {api} = useAuth();
  const getSwr = useAsyncSwr([raw('./graphql/CrewZones.graphql'), null], (query, params) => (
    api(params, query).chain(maybeToAsync('crew_zone prop was expected', getProp('crew_zone')))
  ));
  const mapped = pipe(
    getProp('data'),
    chain(safe(not(isEmpty))),
    map(map(a => ({key: a.name, value: a.id}))),
    either(() => [], e => e)
  )(getSwr);

  return {
    ...getSwr,
    mapped
  }
};