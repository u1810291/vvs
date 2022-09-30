import {titleCase} from '@s-e/frontend/transformer/string';
import {joinString} from '@s-e/frontend/transformer/array';
import {pipe, safe, getProp, branch, map, extend, merge, chain, isTruthy, isString, alt, curry, constant, and, option} from 'crocks';

const appendName = curry((prop, pair) => [
  ...pair.snd(),
  pipe(
    getProp(prop),
    chain(safe(and(isString, isTruthy))),
    map(a => a.trim()),
    option(''),
  )(pair.fst())
]);

/**
 * @summary getName :: object -> Maybe<String>
 * @type {(user: object) => import('crocks/Maybe').default}
 */
const constructNameFromProvider = pipe(
  branch,
  map(constant([])),
  extend(appendName('first_name')),
  extend(appendName('last_name')),
  merge((_, r) => r),
  joinString(' '),
  a => a.trim(),
  safe(isTruthy),
);

/**
 * @summary getName :: object -> Maybe<String>
 * @type {(user: object) => import('crocks/Maybe').default}
 */
const constructNameFromAuth = pipe(
  branch,
  map(constant([])),
  extend(appendName('firstName')),
  extend(appendName('lastName')),
  merge((_, r) => r),
  joinString(' '),
  a => a.trim(),
  safe(isTruthy),
);

/**
 * @summary getName :: object -> Maybe<String>
 * @type {(user: object) => import('crocks/Maybe').default}
 */
const getFullNameFromAuth = pipe(
  getProp('fullName'),
  chain(safe(isString)),
  map(a => a.trim()),
  chain(safe(isTruthy)),
);

/**
 * @summary getName :: object -> Maybe<String>
 * @type {(user: object) => import('crocks/Maybe').default}
 */
export const getName = user => pipe(
  constructNameFromProvider,
  alt(getFullNameFromAuth(user)),
  alt(constructNameFromAuth(user)),
  map(titleCase),
  alt(getProp('id', user)),
)(user);

/**
 * @summary getPhone :: object -> Maybe<String>
 * @type {(user: object) => import('crocks/Maybe').default}
 */
export const getPhone = pipe(
  getProp('phone'),
  chain(safe(isString)),
  map(a => a.replace(/ /, '')),
  chain(safe(isTruthy)),
);

/**
 * @summary getPhone :: object -> Maybe<String>
 * @type {(user: object) => import('crocks/Maybe').default}
 */
export const getEmail = pipe(
  getProp('email'),
  chain(safe(isString)),
  map(a => a.replace(/ /, '')),
  chain(safe(isTruthy)),
);

