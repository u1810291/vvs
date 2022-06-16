import {identity, ifElse, isArray, curry, isFunction, propSatisfies} from 'crocks';

export const putIntoArray = ifElse(isArray, identity, (value) => [value]);

export const every = curry((pred, a) => ifElse(
  propSatisfies('every', isFunction),
  a => a.every(pred),
  identity,
  a,
));

export const some = curry((pred, a) => ifElse(
  propSatisfies('every', isFunction),
  a => a.some(pred),
  identity,
  a,
));
