import {useAuth} from 'context/auth';
import resultToAsync from 'crocks/Async/resultToAsync';
import {useAsyncEffect} from 'hook/useAsync';
import {useMemo} from 'react';
import raw from 'raw.macro';
import useAsyncSwr from 'hook/useAsyncSwr';
import {
  chain,
  flip,
  getPath,
  getProp,
  getPropOr,
  isArray,
  isEmpty,
  isTruthy,
  map,
  mapProps,
  maybeToAsync,
  not,
  option,
  pipe,
  safe,
} from 'crocks';

export const useObject = (id) => {
  const {api} = useAuth();
  const getSwr = useAsyncSwr([raw('./graphql/ObjectById.graphql'), {id}], (query, params) => (
    api(params, query)
    .chain(maybeToAsync('object_by_pk prop was expected', getProp('object_by_pk')))
  ));

  const update = useMemo(() => pipe(
    resultToAsync,
    map(a => ({...a, id})),
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
    chain(flip(api)(raw('./graphql/UpdateObjectById.graphql')))
  ), [api]);

  return {
    ...getSwr,
    update,
  }
};

export const useCity = (isSimplified = false) => {
  const {apiQuery} = useAuth();
  const effect = useAsyncEffect(apiQuery('query { city { value } }'));

  if (isSimplified) return (
    getPath(['data', 'city'], effect)
    .chain(safe(isArray))
    .map(pipe(
      map(getPropOr(null, 'value')),
      arr => arr.filter(isTruthy)
    ))
    .option([])
  )

  return effect;
};
