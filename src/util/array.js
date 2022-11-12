import {
  curry,
  pipe,
  getPropOr,
  identity,
  ifElse,
  isArray,
  isFunction,
  propSatisfies,
  reduce,
  setProp,
} from 'crocks';

export const putIntoArray = ifElse(isArray, identity, (value) => [value]);

export const every = curry((pred, a) => ifElse(
  propSatisfies('every', isFunction),
  a => a.every(pred),
  identity,
  a,
));

/**
 * @type {(getMaybeItem: import('crocks/Maybe').default) => (items: Array) => Array}
 */
export const mapByMaybe = curry((getMaybeItem, items) => (
  reduce((carry, item) => (
    getMaybeItem(item)
    .map(thing => [...carry, thing])
    .option(carry)
  ), [], items)
));

/**
 * @type {(fns: Array<CallableFunction>, item: any) => Array<any>}
*
 * invertMap :: [a -> b] -> a -> [ba]
 */
export const invertMap = curry((fns, item) => fns.map(fn => fn(item)));

export const groupByMaybe = curry((m, list) => reduce((carry, item) => (
  m(item)
  .map(key => setProp(
    key,
    [...getPropOr([], key, carry), item],
    carry
  ))
  .option(carry)
), {}, list))

export const groupByMaybeAsArray = curry((m, list) => pipe(
  reduce((carry, item) => (
    m(item)
    .map(key => setProp(
      key,
      [...getPropOr([], key, carry), item],
      carry
    ))
    .option(carry)
  ), {}),
  Object.values,
)(list))
