import {useAuth} from 'context/auth';
import {
  chain,
  constant,
  resultToAsync,
  flip,
  ifElse,
  isEmpty,
  isNil,
  map,
  not,
  option,
  pipe,
  safe,
  getPath,
  isArray,
  isTruthy,
  getPropOr,
} from 'crocks';
import {useAsyncEffect} from 'hook/useAsync';
import useAsyncSwr from 'hook/useAsyncSwr';
import {useMemo} from 'react';

export const mapToString = ifElse(
  isNil,
  constant(''),
  String,
);

export const mapToNullableNumber = pipe(
  safe(not(isEmpty)),
  map(parseFloat),
  chain(safe(not(isNaN))),
  option(null),
);

export const createUseList = (graphQl, asyncMapFromApi) => () => {
  const {apiQuery} = useAuth();

  return useAsyncSwr([graphQl], (query) => (
    apiQuery(query)
    .chain(asyncMapFromApi)
  ));
}

export const createUseOne = ({
  getGraphQl,
  createGraphql,
  updateGraphQl,
  asyncMapFromApi,
  asyncMapToApi
}) => (id) => {
  const {api} = useAuth();
  const getSwr = useAsyncSwr([getGraphQl, {id}], (query, params) => (
    api(params, query)
    .chain(asyncMapFromApi)
  ));

  const create = useMemo(() => pipe(
    resultToAsync,
    chain(asyncMapToApi),
    chain(flip(api)(createGraphql))
  ), [api]);

  const update = useMemo(() => pipe(
    resultToAsync,
    map(a => ({...a, id})),
    chain(asyncMapToApi),
    chain(flip(api)(updateGraphQl))
  ), [api]);

  return {
    ...getSwr,
    update,
    create,
  }
}

export const createUseEnum = ({
  graphQl,
  itemsProp,
  valueProp
}) => (isSimplified = false) => {
  const {apiQuery} = useAuth();
  const effect = useAsyncEffect(apiQuery(graphQl));

  if (isSimplified) return (
    getPath(['data', itemsProp], effect)
    .chain(safe(isArray))
    .map(pipe(
      map(getPropOr(null, valueProp)),
      arr => arr.filter(isTruthy)
    ))
    .option([])
  )

  return effect;
};
