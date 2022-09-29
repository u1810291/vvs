import ENV from '../env';
import {fetchGql} from '@s-e/frontend/fetch';
import {
  Async,
  bichain,
  curry,
  getPropOr,
  hasProp,
  identity,
  ifElse,
  isArray,
  pipe,
} from 'crocks';

const {Rejected, Resolved} = Async;

export const parseHasuraOutput = pipe(
  ifElse(hasProp('data'), Async.Resolved, Async.Rejected),
  bichain(
    pipe(getPropOr(Rejected('unknown error'), 'errors'), Rejected),
    pipe(getPropOr(Resolved(null), 'data'), Resolved)
  ),
);

/**
 * @type {(headers: Headers} => (variables: object) => (query: string) => Async}
 */
export const api = curry((headers, variables, query) => (
  fetchGql(
    `${ENV.API_QUERY_PROTOCOL}${ENV.API_ENDPOINT}`,
    headers,
    ifElse(isArray, arr => arr.join(' '), identity, query),
    variables
  ).chain(parseHasuraOutput)
));

export const apiQuery = api(undefined);

export const apiAdmin = api(
  ENV.IS_DEV ? {'x-hasura-admin-secret': ENV.API_SECRET} : undefined
);

export const apiAdminQuery = apiAdmin(undefined)
