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
    'https://ai2.swarm.testavimui.eu/v1/graphql',
    headers,
    ifElse(isArray, arr => arr.join(' '), identity, query),
    variables
  ).chain(parseHasuraOutput)
));

export const apiQuery = api(undefined);
